import * as http from 'http';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import request from 'supertest';

import app from '../../../../app';
import {connectMongoose, clearDbAndRestartCounters, disconnectMongoose} from '../../../../shared/tests/helpers';

const server = http.createServer(app.callback());

const query = `mutation RegisterPetMutation($input: RegisterPetMutationInput!) {
  registerPetMutation(input: $input) {
    pet {
      id
      name
    }
  }
}`;

beforeAll(connectMongoose);
beforeEach(clearDbAndRestartCounters);
afterAll(disconnectMongoose);

describe('Pets Controller', () => {
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

  describe('Create Pet', () => {
    it('creates a pet successfully', async () => {
      const variables = {
        input: {
          name: 'bob',
          gender: 'MALE',
          location: {
            type: 'Point',
            coordinates: [12.12, 14.14],
          },
          photos: ['my-photos'],
          specie: 'DOG',
          age: 10,
          description: 'The cutest dog ever',
        },
      };

      const response = await request(server)
        .post('/')
        .send({
          operationName: 'RegisterPetMutation',
          query,
          variables,
        });

      const {registerPetMutation} = response.body.data;

      expect(registerPetMutation.pet.name).toBe('bob');
    });
  });
});
