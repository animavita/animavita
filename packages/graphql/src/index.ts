import {createServer, proxy} from 'aws-serverless-express';

import connectDatabase from './common/database';

import app from './app';

export const handler = (event, ctx) => {
  connectDatabase()
    .then(() => proxy(createServer(app.callback()), event, ctx))
    // eslint-disable-next-line no-console
    .catch(err => console.log(err));
};
