#!/bin/bash
# This script must be executed from the repo root folder

if [ -f ./.env.prod ]; then
  source ./.env.prod
else
  echo "ERROR: Make sure you have your environment variables setup for production environment"
  exit
fi

if ! command -v aws >/dev/null; then
  echo "ERROR: You need to install aws cli. Try \"pip install awscli\" if you have python on your env"
  exit
fi

# Build
rm -rf build
yarn build

cp .env.prod .env.example ./build
mv ./build/.env.prod ./build/.env

# Get bucket location or create a new one
aws s3api get-bucket-location --bucket $AWS_S3_BUCKET_NAME --region $AWS_REGION || aws s3 mb s3://$AWS_S3_BUCKET_NAME --region $AWS_REGION

# Package
aws cloudformation package --template ./aws/prod.yml --s3-bucket $AWS_S3_BUCKET_NAME --output-template ./aws/prod.sam.yml --region $AWS_REGION

# Deploy
aws cloudformation deploy --template-file ./aws/prod.sam.yml --stack-name $AWS_CLOUD_FORMATION_STACK_NAME --capabilities CAPABILITY_IAM --region $AWS_REGION
