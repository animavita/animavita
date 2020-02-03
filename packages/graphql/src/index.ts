import serverless from 'aws-serverless-koa';

import app from './app';
import connectDatabase from './common/database';

(async () => {
  await connectDatabase();
})();

export const handler = serverless(app);
