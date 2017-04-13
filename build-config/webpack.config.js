
// finding out which loader is bad
// process.traceDeprecation = true;

const webpack = require('webpack');
const path = require('path');

// const nodeEnv = process.env.NODE_ENV || 'development';
const nodeEnv = process.env.NODE_ENV || 'production';
const isProd = nodeEnv === 'production';
const isDebug = !isProd;

// ===========================================================================
//                            Plugins Config
// ===========================================================================
const plugins_base = [
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    options: { context: path.resolve(__dirname, '..') }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    minChunks: Infinity,
    filename: 'commons.bundle.js',
  }),
];

const plugins_dev = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
];

const plugins_prod = [
  new webpack.optimize.UglifyJsPlugin(require('./webpack-uglifyjs')),
];


// ===========================================================================
//                            Webpack Config
// ===========================================================================

const sourcePath = path.resolve(__dirname, '../src');
const staticsPath = path.resolve(__dirname, '../public');
const depsPath = path.resolve(__dirname, '../node_modules');

const resolve = {
  extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
  modules: [ sourcePath, depsPath ],
};

module.exports = {
  devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
  context: sourcePath,
  entry: {
    app: './index.jsx',
  },
  output: {
    path: staticsPath,
    filename: '[name].bundle.js'
  },

  module: { rules: require('./webpack-loaders')(isProd) },

  plugins: plugins_base.concat(isProd ? plugins_prod : plugins_dev),

  resolve,

  devServer: {
    contentBase: './src',
    historyApiFallback: true,
    port: 3000,
    compress: isProd,
    inline: !isProd,
    hot: !isProd,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      }
    },
  }
};
