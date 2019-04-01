import { GraphQLServer, PubSub } from 'graphql-yoga';
import mongoose from 'mongoose';
import schema from './graphql';
import middlewares from './graphql/middlewares';
import { getAuth } from './utils/auth';

require('dotenv').config();

class Server {
  constructor() {
    const server = new GraphQLServer(Server.graphql());
    Server.database();

    server.start(Server.options(), ({ port }) => console.log(`🚀 Server is running on http://localhost:${port}`));
  }

  static graphql() {
    const pubsub = new PubSub();
    return {
      schema,
      context: request => ({
        ...request,
        pubsub,
        user: getAuth(request)
      }),
      middlewares
    };
  }

  static options() {
    return {
      port: process.env.PORT || '4000',
      endpoint: '/graphql',
      subscriptions: '/subscriptions',
      playground: '/playground'
    };
  }

  /* Set up database connection with mongoose */
  static async database() {
    try {
      return await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true
      });
    } catch (error) {
      throw new Error('Mongoose connect failed!');
    }
  }
}

export default new Server();
