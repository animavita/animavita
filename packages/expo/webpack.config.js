const path = require('path');

const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // for babel-loader

  config.module.rules[1].oneOf[2].use.options.root = path.resolve(__dirname, '..', '..');

  config.module.rules[1].oneOf[2].use.options.presets = [
    '@babel/preset-env',
    '@babel/preset-flow',
    '@babel/preset-typescript',
    '@babel/preset-react',
  ];

  config.module.rules[1].oneOf[2].use.options.plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
  ];

  config.module.rules[1].oneOf[2].include = [
    path.resolve(__dirname),
    path.resolve(__dirname, '..', 'theme'),
    path.resolve(__dirname, '..', 'ui'),
    path.resolve(__dirname, '..', '..', 'node_modules', 'react-native-gesture-handler'),
    path.resolve(__dirname, '..', '..', 'node_modules', '@animavita'),
    path.resolve(__dirname, '..', '..', 'node_modules', '@react-navigation'),
    path.resolve(__dirname, '..', '..', 'node_modules', 'react-native-modules'),
  ];

  return config;
};
