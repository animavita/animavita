#!/bin/bash
# This script must be executed from the repo root folder

if ! command -v aws >/dev/null; then
  echo "ERROR: You need to install aws cli. Try \"pip install awscli\" if you have python on your env"
  exit
fi

# Create environment.ts
cat <<EOF >./environment.ts
import Constants from 'expo-constants';
import {Platform} from 'react-native';

const localhost = Platform.OS !== 'android' ? 'localhost:5001' : '10.0.2.2:5001';

const ENV = {
  dev: {
    graphqlApi: '$GRAPHQL_API_URL',
  },
  staging: {
    graphqlApi: '$GRAPHQL_API_URL',
  },
  prod: {
    graphqlApi: '$GRAPHQL_API_URL',
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
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
