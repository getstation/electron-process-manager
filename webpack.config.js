const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'dist');

const config = {
  entry: path.resolve(__dirname, 'src/ui/index.js'),
  target: 'electron-renderer',
  output: {
    path: BUILD_DIR,
    filename: 'ui-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        include: path.resolve(__dirname, 'src/ui'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ],
            }
          }
        ]
    }
    ]
  },
};

module.exports = config;
