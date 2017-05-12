
// find out which loader is to blame
// process.traceDeprecation = true;

const webpack = require('webpack');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');

const node_env = process.env.NODE_ENV || 'production';
const is_prod = node_env === 'production';

console.log(`Building for ENV: ${is_prod ? 'production' : node_env}`);


// ===========================================================================
//                            Pathes
// ===========================================================================
const source_path = path.resolve(__dirname, '../src');
const output_path = path.resolve(__dirname, '../target');
const dep_path = path.resolve(__dirname, '../node_modules');
const public_prefix = 'http://localhost:8080/'; // CDN prefix to load built modules

const bundle_name_pattern = is_prod ? '[name]-[chunkhash:12].js' : '[name].js';

// ===========================================================================
//                            Plugins Config
// ===========================================================================
const plugins_base = [
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(node_env) }
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    options: { context: path.resolve(__dirname, '..') }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: bundle_name_pattern,
    minChunks: _ => /node_modules/.test(_.resource),
  }),
  new AssetsPlugin({
    path: output_path,
    filename: '__assets.json',
    prettyPrint: true,
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

const resolve = {
  extensions: [
    // '.webpack-loader.js', '.web-loader.js', '.loader.js',
    '.js', '.jsx',
  ],
  modules: [ source_path, dep_path ],
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
  bail: is_prod,

  devtool: is_prod ? 'source-map' : 'cheap-module-source-map',

  context: source_path,

  entry: (is_prod ? [] : entry_dev).concat(entry),

  output: {
    path: output_path,
    pathinfo: !is_prod,
    filename: bundle_name_pattern,
    publicPath: public_prefix,
  },

  module: { rules: require('./webpack-loaders')(is_prod) },

  plugins: plugins_base.concat(is_prod ? plugins_prod : plugins_dev),

  resolve,

  devServer: require('./webpack-devserver')(is_prod, output_path, public_prefix)
};

