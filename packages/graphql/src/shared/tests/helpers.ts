import http from 'http';

import mongoose from 'mongoose';
import MockAdapter from 'axios-mock-adapter';
import request from 'supertest';

export const gql = String.raw;

process.env.NODE_ENV = 'test';

type Authentication = {
  userId: string;
  token: string;
};

const mongooseOptions = {
  autoIndex: true,
  autoReconnect: false,
  connectTimeoutMS: 10000,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

export async function connectMongoose(customMongooseOptions = {}) {
  jest.setTimeout(20000);
  return mongoose.connect(global.__MONGO_URI__, {
    ...mongooseOptions,
    ...customMongooseOptions,
    dbName: global.__MONGO_DB_NAME__,
  });
}

export async function clearDatabase() {
  await mongoose.connection.db.dropDatabase();
}

export async function disconnectMongoose() {
  await mongoose.disconnect();

  // dumb mongoose
  for (const connection of mongoose.connections) {
    const modelNames = Object.keys(connection.models);

    for (const modelName of modelNames) {
      delete connection.models[modelName];
    }

    const collectionNames = Object.keys(connection.collections);

    for (const collectionName of collectionNames) {
      delete connection.collections[collectionName];
    }
  }
}

export async function clearDbAndRestartCounters() {
  await clearDatabase();
}

export async function getGenericAuthentication(
  axiosInstance: MockAdapter,
  server: http.Server,
): Promise<Authentication> {
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
  const variables = {
    input: {
      token: 'fake-token',
      expires: 1000,
      permissions: ['public_profile', 'email'],
    },
  };

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
}
