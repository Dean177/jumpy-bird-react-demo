import babel from 'gulp-babel';
import gulp from 'gulp';
import gutil from 'gulp-util';
import mocha from 'gulp-mocha';
import nodemon from 'gulp-nodemon';
import webpack from 'webpack';
import webpackConfig, { webpackPort } from './webpack.config';
import WebpackDevServer from 'webpack-dev-server';

gulp.task('app-server', () => { nodemon({ script: 'out/server.js'}); });

gulp.task('compile-server', ['build', 'watch', 'webpack-server']);

gulp.task('watch', () => { gulp.watch('server/**', ['build']); });

gulp.task('build', () => { gulp.src('server/**.js').pipe(babel()).pipe(gulp.dest('out')); });

gulp.task('webpack-server', () => {
  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    progress: true,
    stats: { colors: true },
    proxy: { target: 'http://localhost:9000' },
    historyApiFallback: true,
    inline: true
  }).listen(webpackPort, '0.0.0.0', (err, result) => {
    if (err) { gutil(err); }
    gutil.log(`Listening at localhost:${webpackPort}`);
  });
});
