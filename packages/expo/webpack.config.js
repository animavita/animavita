const path = require('path');

const createExpoWebpackConfigAsync = require('@expo/webpack-config');

const nodeDependencies = [
  'react-native-gesture-handler',
  '@animavita',
  '@react-navigation',
  'react-native-screens',
  'react-relay',
  'relay-runtime',
  'react-native-reanimated',
  'expo-linear-gradient',
  'react-native-elements',
  'react-native-web',
  'react-native-vector-icons',
  'react-native-ratings',
  'expo-constants',
  '@expo/vector-icons',
  '@unimodules/react-native-adapter',
  'expo-localization',
  'expo',
  'react-native-material-menu',
];

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
    'relay',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    ['@babel/plugin-transform-runtime', {regenerator: true}],
  ];

  config.module.rules[1].oneOf[2].include = [
    path.resolve(__dirname),
    path.resolve(__dirname, '..', 'theme'),
    path.resolve(__dirname, '..', 'ui'),
    ...nodeDependencies.map(dep => path.resolve(__dirname, '..', '..', 'node_modules', dep)),
  ];

  return config;
};
