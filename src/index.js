import { GraphQLServer, PubSub } from 'graphql-yoga';
import middlewares from '../core/middleware';
import { database } from '../core/database';
import { getUser } from '../core/auth';
import schema from './graphql';

require('dotenv').config();

/* Connect to mongodb */
database();

const { PORT } = process.env;
const pubsub = new PubSub();

const options = {
  port: PORT || '4000',
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground'
};

const contextSettings = async ({ request }) => {
  const { user } = await getUser(request.headers.authorization);
  return {
    ...request,
    pubsub,
    user
  };
};

const server = new GraphQLServer({
  schema,
  context: contextSettings,
  middlewares
});

server.start(options, ({ port }) => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
