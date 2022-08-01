import http from 'http';

import request from 'supertest';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import app from '../../app';
import {
  clearDbAndRestartCounters,
  connectMongoose,
  disconnectMongoose,
  getGenericAuthentication,
} from '../../shared/tests/helpers';

const server = http.createServer(app.callback());

const query = `mutation CreateAdoption($animalInput: CreateAdoptionInput!) {
  createAdoptionMutation(input: $animalInput) {
    error
    adoption {
      id
      user
      name
      gender
      breed
      type
      age
      size
      photos
      observations
    }
  }
}`;

const variables = {
  animalInput: {
    animal: {
      name: 'Spock',
      breed: 'Husky',
      type: 'DOG',
      gender: 'MALE',
      size: 'BIG',
      age: 6,
      photos: ['11414bfb-f320-4b55-be80-5d275a8e09d2'],
      observations: 'He is ensitive to the heat',
    },
  },
};

beforeAll(connectMongoose);
beforeEach(clearDbAndRestartCounters);
afterAll(disconnectMongoose);

describe('Adoption Mutation', () => {
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

  describe('User logged', () => {
    it('creates an adoption', async () => {
      const {token} = await getGenericAuthentication(mockedAxios, server);
      const response = await request(server)
        .post('/')
        .set('Authorization', token)
        .send({
          operationName: 'CreateAdoption',
          query,
          variables,
        });

      const adoptionInput = variables.animalInput.animal;
      const createdAdoption = response.body.data.createAdoptionMutation.adoption;
      expect(createdAdoption.id).toBeDefined();
      expect(createdAdoption.user).toBeDefined();
      expect(createdAdoption.name).toEqual(adoptionInput.name);
      expect(createdAdoption.gender).toEqual(adoptionInput.gender);
      expect(createdAdoption.breed).toEqual(adoptionInput.breed);
      expect(createdAdoption.type).toEqual(adoptionInput.type);
      expect(createdAdoption.age).toEqual(adoptionInput.age);
      expect(createdAdoption.size).toEqual(adoptionInput.size);
      expect(createdAdoption.photos).toEqual(adoptionInput.photos);
      expect(createdAdoption.observations).toEqual(adoptionInput.observations);
    });
  });

  describe('User not logged or does not exists', () => {
    it('gets an Error response', async () => {
      const response = await request(server)
        .post('/')
        .send({
          operationName: 'CreateAdoption',
          query,
          variables,
        });
      expect(response.body.errors[0]).toBeDefined();
    });
  });
});
