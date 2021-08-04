import * as http from 'http';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import request from 'supertest';

import app from '../../../../app';
import {connectMongoose, clearDbAndRestartCounters, disconnectMongoose} from '../../../../shared/tests/helpers';

const server = http.createServer(app.callback());

const authenticateUserMutation = `mutation ContinueWithFacebookMutation($input: AuthenticateFacebookUserInput!) {
  authenticateFacebookUser(input: $input) {
   error
   user {
     id
     name
   }
   token
 }
}`;

const meQuery = `query getMe {
  me {
    name
    profileImages {
      url
      providedBy
    }
  }
}`;

const userQuery = `query getUser($id: ID!) {
  user (id: $id) {
    id,
    name
    emails {
      email
      providedBy
    }
    providerIds {
      id
      providedBy
    }
    profileImages {
      url
      providedBy
    }
  }
}`;

const variables = {
  input: {
    token: 'fake-token',
    expires: 1000,
    permissions: ['public_profile', 'email'],
  },
};

const setUp = async (axiosInstance: MockAdapter) => {
  axiosInstance.onGet('https://graph.facebook.com/me?fields=id,name,email&access_token=fake-token').reply(200, {
    id: 'fake-id',
    name: 'John Doe',
    email: 'johndoe@animavita.com',
  });

  axiosInstance
    .onGet('https://graph.facebook.com/me/picture?height=720&width=720&redirect=false&access_token=fake-token')
    .reply(200, 'fake-url');

  const response = await request(server)
    .post('/')
    .send({
      operationName: 'ContinueWithFacebookMutation',
      query: authenticateUserMutation,
      variables,
    });

  const {
    authenticateFacebookUser: {user, token},
  } = response.body.data;
  return {
    userId: user.id as string,
    token: token as string,
  };
};

beforeAll(connectMongoose);
beforeEach(clearDbAndRestartCounters);
afterAll(disconnectMongoose);

describe('User Controller', () => {
  const mockedAxios = new MockAdapter(axios);
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => null);
  });
  afterEach(() => {
    mockedAxios.reset();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('Logged user', () => {
    describe('when the user exists', () => {
      it('returns the user', async () => {
        const {token} = await setUp(mockedAxios);

        const response = await request(server)
          .post('/')
          .set('Authorization', token)
          .send({
            operationName: 'getMe',
            query: meQuery,
          });

        const {me} = response.body.data;

        expect(me.name).toBe('John Doe');
      });
    });
  });

  describe('Generic user', () => {
    describe('when the user exists', () => {
      it('returns the user', async () => {
        const {token, userId} = await setUp(mockedAxios);

        const response = await request(server)
          .post('/')
          .set('Authorization', token)
          .send({
            operationName: 'getUser',
            query: userQuery,
            variables: {id: userId},
          });

        const {user} = response.body.data;

        expect(user.name).toBe('John Doe');
        expect(user.providerIds[0]).toEqual({id: 'fake-id', providedBy: 'facebook'});
        expect(user.emails[0]).toEqual({email: 'johndoe@animavita.com', providedBy: 'facebook'});
      });
    });

    describe('when the user does not exists', () => {
      it('returns an error', async () => {
        const {token, userId} = await setUp(mockedAxios);

        const response = await request(server)
          .post('/')
          .set('Authorization', token)
          .send({
            operationName: 'getUser',
            query: userQuery,
            variables: {id: 'nonexisting-id'},
          });

        const {message} = response.body.errors[0];

        expect(message).toBe('User not found');
      });
    });
  });
});
