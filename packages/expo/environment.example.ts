import Constants from 'expo-constants';

const ENV = {
  dev: {
    fbAppID: '',
    fbAppName: '',
  },
  staging: {
    fbAppID: '',
    fbAppName: '',
  },
  prod: {
    fbAppID: '',
    fbAppName: '',
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
