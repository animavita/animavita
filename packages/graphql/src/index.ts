import serverless from 'aws-serverless-koa';

import app from './app';

export const handler = serverless(app);
