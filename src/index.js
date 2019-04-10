import { GraphQLServer, PubSub } from 'graphql-yoga';
import { getAuth } from './utils/auth';
import { database } from './database';
import schema from './graphql';
import middlewares from './graphql/middlewares';

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

const server = new GraphQLServer({
  schema,
  context: request => ({
    ...request,
    pubsub,
    user: getAuth(request)
  }),
  middlewares
});

server.start(options, ({ port }) => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
