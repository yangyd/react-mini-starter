
const path = require('path');

const target_browsers = [
    ">1%",
    "last 4 versions",
    "Firefox ESR",
    "not ie < 9",
];

const babel_presets = [
  [
    'env', {
      targets: { browsers: target_browsers },
      modules: false,
      useBuiltIns: false,
      debug: false,
    },
  ],
  'react',
  'stage-1', // order matters
];

const babel_presets_dev = [];
const babel_presets_prod = ['react-optimize'];

const babel_plugins = [];
const babel_plugins_dev = [
  'transform-react-jsx-source',
  'transform-react-jsx-self',
  'react-hot-loader/babel',
];

const rule_load_babel = (isProd) => ({
  test: /\.jsx?$/,
  loader: 'babel-loader',
  include: [path.resolve(__dirname, '../src')],
  query: {
    cacheDirectory: !isProd,
    babelrc: false,
    presets: babel_presets.concat(isProd ? babel_presets_prod : babel_presets_dev),
    plugins: babel_plugins.concat(isProd ? [] : babel_plugins_dev),
  },
});

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

const rule_load_css = {
  test: /\.css$/,
  use: [ 'style-loader', 'css-loader' ],
};

const rule_load_file = (isProd) => ({
  test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
  loader: 'file-loader',
  query: {
    name: isProd ? '[hash:8].[ext]' : '[path][name].[ext]?[hash:8]',
  },
});

const rule_load_index = {
  test: /index\.html$/,
  loader: 'file-loader',
  query: { name: '[name].[ext]' },
};

function loaders(isProd) {
  return [
    rule_load_babel(isProd),
    rule_load_html,
    rule_load_file(isProd),
    rule_load_css,
    rule_load_index,
  ];
}

module.exports = loaders;

