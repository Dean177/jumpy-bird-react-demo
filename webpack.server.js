var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  proxy: { target: 'http://localhost:9000' },
  historyApiFallback: true
}).listen(9090, 'localhost', function (err, result) {
  if (err) { console.log(err); }
  console.log('Listening at localhost:9090/');
});
