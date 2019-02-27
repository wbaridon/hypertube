const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const srcDir = 'src';
module.exports = {
  entry: ['babel-polyfill', path.resolve(__dirname, srcDir, 'index.jsx')],
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
      Assets: path.resolve(__dirname, 'src/assets'),
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
      AUTHGITHUB: JSON.stringify(require(path.resolve(__dirname, srcDir, 'content.json')).oAuth.github),
      AUTHGOOGLE: JSON.stringify(require(path.resolve(__dirname, srcDir, 'content.json')).oAuth.google),
      AUTHFACEBOOK: JSON.stringify(require(path.resolve(__dirname, srcDir, 'content.json')).oAuth.facebook),
      AUTHGITLAB: JSON.stringify(require(path.resolve(__dirname, srcDir, 'content.json')).oAuth.gitlab),
      AUTHREDDIT: JSON.stringify(require(path.resolve(__dirname, srcDir, 'content.json')).oAuth.reddit),
      AUTHLINKEDIN: JSON.stringify(require(path.resolve(__dirname, srcDir, 'content.json')).oAuth.linkedin),
      AUTHINSTAGRAM: JSON.stringify(require(path.resolve(__dirname, srcDir, 'content.json')).oAuth.instagram),
      BACKEND: JSON.stringify(require(path.resolve(__dirname, srcDir, 'content.json')).BACKEND),
      TIMEOUT_API: 10000,
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
      name: 'Sanaryens',
      short_name: 'Sanaryens',
      description: '*not* a pirate site',
      theme_color: '#0070a0',
      background_color: '#000fff',
      crossorigin: null, // can be null, use-credentials or anonymous
    }),
  ],
};
