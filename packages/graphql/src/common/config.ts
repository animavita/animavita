import envVar from 'env-var';

export const JWT_KEY = envVar.get('JWT_KEY').asString();

export const AWS_S3_BUCKET_NAME = envVar.get('AWS_S3_BUCKET_NAME').asString();
export const AWS_REGION = envVar.get('AWS_REGION').asString();
export const AWS_ACCESS_KEY_ID = envVar.get('AWS_ACCESS_KEY_ID').asString();
export const AWS_SECRET_ACCESS_KEY = envVar.get('AWS_SECRET_ACCESS_KEY').asString();
export const AWS_STANDARD_QUEUE_URL = envVar.get('AWS_STANDARD_QUEUE_URL').asString();

export const MONGO_URI = envVar.get('MONGO_URI').asString();
