
// finding out which loader is bad
// process.traceDeprecation = true;

const webpack = require('webpack');
const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';
const isDebug = !isProd;

const sourcePath = path.resolve(__dirname, './src');
const staticsPath = path.resolve(__dirname, './public');

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.bundle.js'
  }),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
  }),
  new webpack.NamedModulesPlugin(),
];

if (isProd) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false
      },
    })
  );
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

const rule_load_file = {
  test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
  loader: 'file-loader',
  query: {
    name: isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
  },
};


const target_browsers = [
    ">1%",
    "last 4 versions",
    "Firefox ESR",
    "not ie < 9",
];

const rule_load_html = {
  test: /\.html$/,
  use: [ {
    loader: 'html-loader',
    options: {
      minimize: true,
      removeComments: false,
      collapseWhitespace: false,
    }
  }],
};

const rule_load_babel = {
  test: /\.jsx?$/,
  loader: 'babel-loader',
  include: [path.resolve(__dirname, 'src')],
  query: {
    cacheDirectory: isDebug,
    babelrc: false,
    presets: [
      [
        'env',
        {
          targets: { browsers: target_browsers },
          modules: false,
          useBuiltIns: false,
          debug: false,
        },
      ],
      'stage-1', 'react',
      // Optimize React code for the production build
      // https://github.com/thejameskyle/babel-react-optimize
      ...isDebug ? [] : ['react-optimize'],
    ],

    plugins: [
      // Adds component stack to warning messages
      // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx-source
      ...isDebug ? ['transform-react-jsx-source'] : [],
      // Adds __self attribute to JSX which React will use for some warnings
      // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx-self
      ...isDebug ? ['transform-react-jsx-self'] : [],
    ],
  },
};

// ===========================================================================
//                            Webpack Config
// ===========================================================================
module.exports = {
  devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
  context: sourcePath,
  entry: {
    app: './index.jsx',
    vendor: ['react']
  },
  output: {
    path: staticsPath,
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      rule_load_babel,
      rule_load_file,
      rule_load_html,
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath
    ]
  },
  plugins,
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
