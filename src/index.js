import { GraphQLServer, PubSub } from "graphql-yoga";
import mongoose from "mongoose";
import schema from "./graphql/";

class Server {
  constructor() {
    let graphql = {
      schema,
      context: this.context()
    };

    this.server = new GraphQLServer(graphql);

    this.server.start(this.options(), ({ port }) => this.initialized(port));
  }

  initialized(port) {
    console.log(`🚀 Server is running on http://localhost:${port}`);
  }

  options() {
    return {
      port: process.env.PORT || "4000",
      endpoint: "/graphql",
      subscriptions: "/subscriptions",
      playground: "/playground"
    };
  }

  context() {
    const pubsub = new PubSub();
    return {
      // models,
      pubsub
    };
  }
}

export default new Server();
