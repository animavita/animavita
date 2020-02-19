#!/bin/bash
# This script must be executed from the repo root folder

if [ -f ./.env.staging ]; then
  source ./.env.staging
else
  echo "ERROR: Make sure you have your environment variables setup for staging environment"
  exit
fi

if ! command -v aws >/dev/null; then
  echo "ERROR: You need to install aws cli. Try \"pip install awscli\" if you have python on your env"
  exit
fi

# Build
rm -rf build
yarn build

cp .env.staging .env.example ./build
mv ./build/.env.staging ./build/.env
