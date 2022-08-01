import * as http from 'http';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import request from 'supertest';

import app from '../../../../app';
import {
  connectMongoose,
  clearDbAndRestartCounters,
  disconnectMongoose,
  getGenericAuthentication,
} from '../../../../shared/tests/helpers';

const server = http.createServer(app.callback());

const meQuery = `query getMe {
  me {
    name
    profileImage
  }
}`;

const userQuery = `query getUser($id: ID!) {
  user (id: $id) {
    id,
    name
    email
    profileImage
  }
}`;

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
        const {token} = await getGenericAuthentication(mockedAxios, server);

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
        const {token, userId} = await getGenericAuthentication(mockedAxios, server);

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
        expect(user.email).toBe('johndoe@animavita.com');
      });
    });

    describe('when the user does not exists', () => {
      it('returns an error', async () => {
        const {token} = await getGenericAuthentication(mockedAxios, server);

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
