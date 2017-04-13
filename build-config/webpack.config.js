
// finding out which loader is bad
// process.traceDeprecation = true;

const webpack = require('webpack');
const path = require('path');

// const nodeEnv = process.env.NODE_ENV || 'development';
const nodeEnv = process.env.NODE_ENV || 'production';
const isProd = nodeEnv === 'production';

console.log(`Building for ${isProd ? 'production' : 'development'}...`);

const app_bundle_name = 'app.bundle.js';
const commons_bundle_name = 'commons.bundle.js';

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
    filename: commons_bundle_name,
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
//                            Build Config
// ===========================================================================

const sourcePath = path.resolve(__dirname, '../src');
const outputPath = path.resolve(__dirname, '../target');
const depsPath = path.resolve(__dirname, '../node_modules');
const publicPath = '/'; // CDN prefix to load built modules

const resolve = {
  extensions: [
    // '.webpack-loader.js', '.web-loader.js', '.loader.js',
    '.js', '.jsx',
  ],
  modules: [ sourcePath, depsPath ],
};

const entry = [ './index.jsx' ];
const entry_dev = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server',
];


// ===========================================================================
//                            Put them all together
// ===========================================================================
module.exports = {
  devtool: isProd ? 'source-map' : 'cheap-module-source-map',
  context: sourcePath,
  output: {
    path: outputPath,
    filename: app_bundle_name,
    publicPath,
  },

  entry: (isProd ? [] : entry_dev).concat(entry),

  module: { rules: require('./webpack-loaders')(isProd) },

  plugins: plugins_base.concat(isProd ? plugins_prod : plugins_dev),

  resolve,

  devServer: require('./webpack-devserver')(isProd, outputPath, publicPath)
};

