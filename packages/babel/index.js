module.exports = {
  plugins: ['relay'],
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
    'babel-preset-expo',
  ],
  env: {
    test: {
      plugins: ['relay'],
      presets: [
        ['@babel/preset-env', {targets: {node: 'current'}}],
        '@babel/preset-typescript',
        '@babel/preset-react',
        'babel-preset-expo',
      ],
    },
  },
};
