#!/bin/bash
# This script must be executed from the repo root folder

if ! command -v aws >/dev/null; then
  echo "ERROR: You need to install aws cli. Try \"pip install awscli\" if you have python on your env"
  exit
fi

# Create environment.ts
cat <<EOF >./environment.ts
import Constants from 'expo-constants';

const ENV = {
  dev: {
    fbAppID: '$FB_APP_ID',
    fbAppName: '$FB_APP_NAME',
  },
  staging: {
    fbAppID: '$FB_APP_ID',
    fbAppName: '$FB_APP_NAME',
  },
  prod: {
    fbAppID: '$FB_APP_ID',
    fbAppName: '$FB_APP_NAME',
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  } else if (env === 'staging') {
    return ENV.staging;
  } else {
    return ENV.prod;
  }
};

export default getEnvVars;
EOF

# Build
rm -rf web-build
yarn build:web
