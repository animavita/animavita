const path = require('path');

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

  return config;
};
