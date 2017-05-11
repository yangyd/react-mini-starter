
const webpack = require('webpack');
const path = require('path');
const webpackConfig = require('./webpack.config');

// CommonsChunkPlugin problem
// https://github.com/webpack-contrib/karma-webpack/issues/24

// include test sources in Babel loader
webpackConfig.module.rules.forEach(rule => {
  if (rule.loader === 'babel-loader') {
    rule.include.push(path.resolve(__dirname, '../test'));
  }
});

module.exports = () => ({
  devtool: 'inline-source-map',
  resolve: webpackConfig.resolve, // do we need to make ./test resolvable too?
  module: webpackConfig.module,

  plugins: [
    new webpack.IgnorePlugin(/\.json$/),
    // new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: false,
    }),
  ],

});

