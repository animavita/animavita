import path from 'path';

import dotenv from 'dotenv';
import envVar from 'env-var';

const cwd = process.cwd();
const isProduction = process.env.NODE_ENV === 'production';

dotenv.config({
  path: path.join(cwd, '.env'),
});

export const JWT_KEY = envVar
  .get('JWT_KEY')
  .required()
  .asString();

export const AWS_S3_BUCKET_NAME = envVar
  .get('AWS_S3_BUCKET_NAME')
  .default('animavita')
  .required(isProduction)
  .asString();
export const AWS_REGION = envVar
  .get('AWS_REGION')
  .default('us-east-1')
  .required(isProduction)
  .asString();
export const AWS_ACCESS_KEY_ID = envVar
  .get('AWS_ACCESS_KEY_ID')
  .default('foo')
  .required(isProduction)
  .asString();
export const AWS_SECRET_ACCESS_KEY = envVar
  .get('AWS_SECRET_ACCESS_KEY')
  .default('bar')
  .required(isProduction)
  .asString();
export const AWS_STANDARD_QUEUE_URL = envVar
  .get('AWS_STANDARD_QUEUE_URL')
  .default('http://localhost:4566/000000000000/animavita')
  .required()
  .asString();

export const MONGO_URI = envVar
  .get('MONGO_URI')
  .default('mongodb://localhost:27017/animavita')
  .required(isProduction)
  .asString();
