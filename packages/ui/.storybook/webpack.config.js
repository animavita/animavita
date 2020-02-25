const path = require('path');
const webpack = require('webpack');

module.exports = ({config, mode}) => {
  config.module.rules.push({
    test: /\.(gif|jpe?g|png|svg)$/,
    use: {
      loader: require.resolve('url-loader'),
      options: {name: '[name].[ext]'},
    },
  });

  config.resolve.extensions = ['.js', '.jsx'];

  // typescript support
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: ['@babel/preset-typescript', '@babel/preset-react'],
    },
    include: [path.resolve(__dirname, '..'), path.resolve(__dirname, '..', '..', 'theme')],
  });

  config.resolve.extensions.push('.ts', '.tsx');

  config.resolve.alias = {
    'react-native': 'react-native-web',
  };

  // config.module.rules[0].include.push(
  //   path.resolve(__dirname, '..', '..', '..', 'node_modules', 'react-native-safe-area-view'),
  //   path.resolve(__dirname, '..', '..', '..', 'node_modules', '@react-navigation'),
  //   path.resolve(__dirname, '..', '..', '..', 'node_modules', 'react-native-gesture-handler'),
  // );

  return config;
};
