import path from 'path';
import webpack, { HotModuleReplacementPlugin } from 'webpack';

export const webpackPort = 9090;

const config  = {
  devtool: 'eval',
  entry: [
    `webpack-dev-server/client?http://alpaca:${webpackPort}/`,
    'webpack/hot/only-dev-server',
    './client/index'
  ],
  output: {
    path: path.join(__dirname, 'out/client'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel?stage=0'],
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'shared')
        ]
      },
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.(png|gif|jpg)$/, loader: "file-loader" }
    ]
  }
};

export default config;