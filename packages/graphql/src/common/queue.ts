import Producer from 'sqs-producer';

import {AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY, AWS_STANDARD_QUEUE_URL} from './config';

export const standardQueue = Producer.create({
  queueUrl: AWS_STANDARD_QUEUE_URL,
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  ...(process.env.NODE_ENV === 'production' ? {sessionToken: process.env.AWS_SESSION_TOKEN} : {}),
});
