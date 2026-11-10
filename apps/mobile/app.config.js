// E2E builds are release builds that talk to the local backend (see e2e/README.md).
const isE2E = process.env.EXPO_PUBLIC_E2E === 'true';

// Release builds block plain http://, which the local backend and S3 use
const withCleartextTraffic = (plugins) =>
  plugins.map((plugin) => {
    const [name, options = {}] = Array.isArray(plugin) ? plugin : [plugin];
    if (name !== 'expo-build-properties') return plugin;
    return [name, { ...options, android: { ...options.android, usesCleartextTraffic: true } }];
  });

module.exports = ({ config }) => {
  const appJsonPlugins = config.plugins ?? [];

  const getApiUrl = () => {
    switch (process.env.APP_ENV) {
      case 'dev': {
        return {
          android: 'http://10.0.2.2:3000',
          ios: 'http://localhost:3000',
          web: 'http://localhost:3000',
        };
      }
      case 'staging': {
        return 'https://api-staging.animavita.pet';
      }
      case 'prod': {
        return 'https://api.animavita.pet';
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
      // An over-the-air update would replace the code under test
      ...(isE2E && { enabled: false }),
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    android: {
      ...config.android,
      package: 'com.ggbelgamo.animavita',
    },
    ios: {
      ...config.ios,
      bundleIdentifier: 'com.ggbelgamo.animavita',
    },
    plugins: [
      ...(isE2E ? withCleartextTraffic(appJsonPlugins) : appJsonPlugins),
      'expo-localization',
    ],
  };
};
