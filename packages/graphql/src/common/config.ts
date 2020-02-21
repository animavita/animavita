import path from 'path';

import dotEnvSafe from 'dotenv-safe';
import envVar from 'env-var';

const cwd = process.cwd();

const root = path.join.bind(cwd);

dotEnvSafe.config({
  allowEmptyValues: true,
  path: root('.env'),
  // sample: root('.env.example'),
});

export const JWT_KEY = envVar
  .get('JWT_KEY')
  .required()
  .asString();

export const AWS_S3_BUCKET_NAME = envVar
  .get('AWS_S3_BUCKET_NAME')
  .required()
  .asString();
export const AWS_REGION = envVar
  .get('AWS_REGION')
  .required()
  .asString();
export const AWS_ACCESS_KEY_ID = envVar
  .get('AWS_ACCESS_KEY_ID')
  .required()
  .asString();
export const AWS_SECRET_ACCESS_KEY = envVar
  .get('AWS_SECRET_ACCESS_KEY')
  .required()
  .asString();
export const AWS_STANDARD_QUEUE_URL = envVar
  .get('AWS_STANDARD_QUEUE_URL')
  .required()
  .asString();

export const MONGO_URI = envVar
  .get('MONGO_URI')
  .required()
  .asString();
