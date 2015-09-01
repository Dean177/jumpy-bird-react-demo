var path = require('path');
var webpack = require('webpack');

var webpackPort = 9090;

module.exports = {
    devtool: 'eval',
    entry: [
      'webpack-dev-server/client?http://localhost:9090/',
      'webpack/hot/only-dev-server',
      './src/index'
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/assets/'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      loaders: [
        { test: /\.js$/, loaders: ['react-hot', 'babel?stage=1'], include: path.join(__dirname, 'src') },
        { test: /\.less$/, loader: "style!css!less" },
        { test: /\.png$/, loader: "file-loader" }
      ]
    }
};