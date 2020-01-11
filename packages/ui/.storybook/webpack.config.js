const path = require('path');
const webpack = require('webpack');

module.exports = ({config, mode}) => {
  config.module.rules.push({
    test: /\.(gif|jpe?g|png|svg)$/,
    use: {
      loader: 'url-loader',
      options: {name: '[name].[ext]'},
    },
  });

  config.resolve.extensions = ['.web.js', '.js', '.json', '.web.jsx', '.jsx'];

  // typescript support
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', {flow: true, typescript: true}]],
    },
  });

  config.resolve.extensions.push('.ts', '.tsx');

  config.resolve.alias = {
    'react-native': 'react-native-web',
  };

  return config;
};
