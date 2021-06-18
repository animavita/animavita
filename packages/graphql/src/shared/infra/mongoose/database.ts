import mongoose from 'mongoose';

import {MONGO_URI} from '../../config';

export default function connectDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connection
      // Reject if an error ocurred when trying to connect to MongoDB
      .on('error', error => {
        // eslint-disable-next-line no-console
        console.log('ERROR: Connection to DB failed');
        reject(error);
      })
      // Exit Process if there is no longer a Database Connection
      .on('close', () => {
        // eslint-disable-next-line no-console
        console.log('ERROR: Connection to DB lost');
        process.exit(1);
      })
      // Connected to DB
      .once('open', () => {
        // Display connection information
        // eslint-disable-next-line no-console
        mongoose.connections.map(info => console.log(`Connected to ${info.host}:${info.port}/${info.name}`));
        // Return sucessfull promisse
        resolve();
      });

    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      connectTimeoutMS: 10000,
    });
  });
}
