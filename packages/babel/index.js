module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  env: {
    test: {
      presets: [['@babel/preset-env', {targets: {node: 'current'}}], '@babel/preset-typescript', '@babel/preset-react'],
    },
  },
};
