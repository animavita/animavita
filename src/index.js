import { GraphQLServer, PubSub } from 'graphql-yoga';
import mongoose from 'mongoose';
import schema from './graphql';
import models from './models';
import middlewares from './graphql/middlewares';

require('dotenv').config();

class Server {
  constructor() {
    const server = new GraphQLServer(this.graphql());
    this.database();

    server.start(this.options(), ({ port }) =>
      console.log(`🚀 Server is running on http://localhost:${port}`)
    );
  }

  graphql() {
    return {
      schema,
      context: request => Object.assign(this.context(), { ...request }),
      middlewares: middlewares
    };
  }

  options() {
    return {
      port: process.env.PORT || '4000',
      endpoint: '/graphql',
      subscriptions: '/subscriptions',
      playground: '/playground'
    };
  }

  context() {
    const pubsub = new PubSub();
    return {
      models,
      pubsub
    };
  }

  async database() {
    return await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true
    });
  }
}

export default new Server();
