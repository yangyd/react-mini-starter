
const webpack = require('webpack');
const path = require('path');

// Force Webpack to build for development (so that CSS Modules doesn't mangle className too hard)
process.env.NODE_ENV = 'development';
const webpackConfig = require('./webpack.config');

const src_dir = path.resolve(__dirname, '../src');
const test_src_dir = path.resolve(__dirname, '../test');


// Config the Babel loader for test
//   - include test sources
//   - enable istanbul instrumenter
webpackConfig.module.rules.some(rule => {
  if (rule.loader === 'babel-loader') {
    rule.include.push(test_src_dir);
    rule.query.plugins.unshift('istanbul');
    return true;
  }
});

// Enable ESLint check
webpackConfig.module.rules.push({
  loader: "eslint-loader",
  test: /\.jsx?$/,
  include: [src_dir, test_src_dir],
  exclude: /node_modules/,
  enforce: "pre",
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

