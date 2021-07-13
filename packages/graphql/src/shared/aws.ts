import AWS from 'aws-sdk';

import {AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY} from './config';

if (process.env.NODE_ENV !== 'test') {
  AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    // needed for Lambda to be authorized to upload files on S3 (also Lambda role should be listed on bucket policy, see https://aws.amazon.com/pt/premiumsupport/knowledge-center/access-denied-lambda-s3-bucket/)
    ...(process.env.NODE_ENV === 'production' ? {sessionToken: process.env.AWS_SESSION_TOKEN} : {}),
    region: AWS_REGION,
  });
}
