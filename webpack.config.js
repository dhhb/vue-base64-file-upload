'use strict';

const env = process.env.NODE_ENV || 'development';

const webpack = require('webpack');
const path = require('path');
const webpackUMDExternal = require('webpack-umd-external');

const pluginsList = [];
const outputFileName = env === 'production' ?
  'vue-base64-file-upload.min.js' :
  'vue-base64-file-upload.js';

if (env === 'production') {
  pluginsList.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false }
    })
  );
}

const config = {
  entry: path.join(__dirname, 'src/index.js'),

  output: {
    path: path.join(__dirname, 'dist'),
    filename: outputFileName,
    library: 'VueBase64FileUpload',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  externals: webpackUMDExternal({
    'vue': 'Vue'
  }),

  resolve: {
    extensions: ['', '.js'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },

  plugins: pluginsList,

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel']
    }]
  }
};

module.exports = config;
