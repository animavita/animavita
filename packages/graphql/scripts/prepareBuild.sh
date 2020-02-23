#!/bin/bash
# This script must be executed from the repo root folder

if ! command -v aws >/dev/null; then
  echo "ERROR: You need to install aws cli. Try \"pip install awscli\" if you have python on your env"
  exit
fi

# Build
rm -rf build
yarn build
