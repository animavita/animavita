import * as http from 'http';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import request from 'supertest';

import app from '../../../../app';
import {connectMongoose, clearDbAndRestartCounters, disconnectMongoose} from '../../../../shared/tests/helpers';

const server = http.createServer(app.callback());

const query = `mutation ContinueWithFacebookMutation($input: SaveFacebookUserInput!) {
  authenticateFacebookUser(input: $input) {
   error
   user {
     name
   }
   token
 }
}`;

const variables = {
  input: {
    token: 'fake-token',
    expires: 1000,
    permissions: ['public_profile', 'email'],
  },
};

beforeAll(connectMongoose);
beforeEach(clearDbAndRestartCounters);
afterAll(disconnectMongoose);

describe('Facebook Session Controller', () => {
  describe('when successfully get data from facebook', () => {
    it('authenticates the user', async () => {
      const mockedAxios = new MockAdapter(axios);

      mockedAxios.onGet('https://graph.facebook.com/me?fields=id,name,email&access_token=fake-token').reply(200, {
        id: 'fake-id',
        name: 'John Doe',
        email: 'johndoe@animavita.com',
      });

      mockedAxios
        .onGet('https://graph.facebook.com/me/picture?height=720&width=720&redirect=false&access_token=fake-token')
        .reply(200, 'fake-url');

      const response = await request(server)
        .post('/')
        .send({
          operationName: 'ContinueWithFacebookMutation',
          query,
          variables,
        });

      const {
        authenticateFacebookUser: {user, token, error},
      } = response.body.data;

      expect(user.name).toBe('John Doe');
      expect(token).toMatch(/(JWT )\w+\.\w+\.\w+/g);
      expect(error).toBeNull();
    });
  });
});
