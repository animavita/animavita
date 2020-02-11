const merge = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  entry: {
    index: './src/index.ts',
    worker: './src/worker.ts',
  },
});
