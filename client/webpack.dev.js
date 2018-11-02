const merge = require('webpack-merge');
const common = require('./webpack.config.js');


module.exports = (env) => {
  const myUser = env.user;
  console.log(myUser === 'ec2-user'
    ? 'Using 0.0.0.0 because we\'re on amz linux'
    : 'using localhost for other dev environments');
  return merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
      ],
    },
    devServer: {
      contentBase: './dist',
      publicPath: '/',
      historyApiFallback: true,
      disableHostCheck: true,
      port: 8080,
      host: myUser === 'ec2-user' ? '0.0.0.0' : 'localhost',
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      // new webpack.DefinePlugin({
      //   'process.env.NODE_ENV': JSON.stringify('development'),
      // }),
    ],
  });
};
