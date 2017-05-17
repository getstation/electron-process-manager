const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'dist');

const config = {
  entry: path.resolve(__dirname, 'src/ui/index.js'),
  output: {
    path: BUILD_DIR,
    filename: 'ui-bundle.js'
  },
  module : {
    loaders : [
      {
        test: /\.(jsx|js)?$/,
        loader : 'babel-loader',
        include: path.resolve(__dirname, 'src/ui')
      }
    ]
  }};

module.exports = config;
