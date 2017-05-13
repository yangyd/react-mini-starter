
const webpack = require('webpack');
const path = require('path');

// Force Webpack to build for development (so that CSS Modules doesn't mangle className too hard)
process.env.NODE_ENV = 'development';
const webpackConfig = require('./webpack.config');

// Config the Babel loader for test
//   - include test sources
//   - enable istanbul instrumenter
webpackConfig.module.rules.forEach(rule => {
  if (rule.loader === 'babel-loader') {
    rule.include.push(path.resolve(__dirname, '../test'));
    rule.query.plugins.unshift('istanbul');
  }
});

module.exports = () => ({
  devtool: 'inline-source-map',
  resolve: webpackConfig.resolve, // do we need to make ./test resolvable too?
  module: webpackConfig.module,

  // CommonsChunkPlugin problem
  // https://github.com/webpack-contrib/karma-webpack/issues/24
  plugins: [
    // new webpack.IgnorePlugin(/\.json$/),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: false,
    }),
  ],

  // for Enzyme
  // https://github.com/airbnb/enzyme/blob/master/docs/guides/webpack.md
  externals: {
    // 'cheerio': 'window',
    'react/addons': 'react',
    'react/lib/ExecutionEnvironment': 'react',
    'react/lib/ReactContext': 'react',
  },

});

