const { join } = require('node:path');

module.exports = {
  target: 'browserslist',
  mode: 'production',
  entry: join(__dirname, 'dist', 'index.js'),
  output: {
    filename: 'browser.js',
    path: join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: ' = require("node:',
          replace: ' = require("',
        },
      },
    ],
  },
  resolve: {
    fallback: {
      // Let's install 1000 more dev libraries yay 🎉
      zlib: require.resolve('browserify-zlib'),
      buffer: require.resolve('buffer/'),
      crypto: require.resolve('crypto-browserify'),
      util: require.resolve('util/'),
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert/'),
    },
  },
};
