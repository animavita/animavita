import Constants from 'expo-constants';
import {Platform} from 'react-native';

const localhost = Platform.OS !== 'android' ? 'localhost:5001' : '10.0.2.2:5001';

const ENV = {
  dev: {
    graphqlApi: `http://${localhost}`,
  },
  staging: {
    graphqlApi: '',
  },
  prod: {
    graphqlApi: '',
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
