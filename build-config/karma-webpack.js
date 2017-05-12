
const webpack = require('webpack');
const path = require('path');
const webpackConfig = require('./webpack.config');

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
