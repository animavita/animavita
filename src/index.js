import { GraphQLServer, PubSub } from 'graphql-yoga';
import mongoose from 'mongoose';
import schema from './graphql';
import models from './models';
import middlewares from './graphql/middlewares';

require('dotenv').config();

class Server {
  constructor() {
    const server = new GraphQLServer(this.graphql());
    Server.database();

    server.start(Server.options(), ({ port }) =>
      console.log(`🚀 Server is running on http://localhost:${port}`)
    );
  }

  graphql() {
    return {
      schema,
      context: request => Object.assign(this.context(), { ...request }),
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

  static context() {
    const pubsub = new PubSub();
    return {
      models,
      pubsub
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
