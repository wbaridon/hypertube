const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const srcDir = 'src';
module.exports = {
  entry: path.resolve(__dirname, srcDir, 'index.jsx'),
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'distribution'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.css', '.jsx', '.js', '.json'],
    alias: {
      Actions: path.resolve(__dirname, 'src/redux/actions'),
      Reducers: path.resolve(__dirname, 'src/redux/reducers'),
      API: path.resolve(__dirname, 'src/api_tools'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: /src/,
        exclude: [/node_modules/],
        use: [
          'babel-loader', 'eslint-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        }],
      },
      {
        test: /favicon\.ico$/,
        loader: 'url',
        query: {
          limit: 1,
          name: '[name].[ext]',
        },
      },
      {
        test: /\.(pdf|jpg|png|gif|svg|ico)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require('./package.json').version),
      HTMLTITLE: JSON.stringify(require(path.resolve(__dirname, srcDir, 'content.json')).htmlTitle),
      AUTH42: JSON.stringify(require(path.resolve(__dirname, srcDir, 'content.json')).oAuth.fortytwo),
      TIMEOUT_API: 5000,
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(srcDir, 'index.html'),
      title: require(path.resolve(__dirname, srcDir, './content.json')).htmlTitle,
      filename: './index.html',
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'src/sw.js'),
    }),
    new WebpackPwaManifest({
      name: 'Pizza altaglia',
      short_name: 'Pizza',
      description: 'Information for pizza',
      theme_color: '#0070a0',
      background_color: '#000fff',
      crossorigin: null, // can be null, use-credentials or anonymous
    }),
  ],
};
