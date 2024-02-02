module.exports = ({ config }) => {
  const getApiUrl = () => {
    switch (process.env.ENV) {
      case 'dev': {
        return {
          android: 'http://10.0.2.2:3000',
          ios: 'http://localhost:3000',
          web: 'http://localhost:3000',
        };
      }
      case 'staging': {
        return 'https://animavita-backend-staging.fly.dev';
      }
      case 'prod': {
        return 'https://api.animavita.com';
      }
    }
  };

  return {
    ...config,
    extra: {
      apiUrl: getApiUrl(),
      eas: {
        projectId: process.env.EXPO_PROJECT_ID,
      },
    },
    updates: {
      url: 'https://u.expo.dev/e24785ad-4327-4470-b374-7b208a31de15',
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    android: {
      package: 'com.belgamo.animavita',
    },
    ios: {
      bundleIdentifier: 'com.ggbelgamo.animavita',
    },
  };
};
