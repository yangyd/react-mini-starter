
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
  'stage-2', // order matters
];

const babel_presets_dev = [];
const babel_presets_prod = ['react-optimize'];

const babel_plugins = [];
const babel_plugins_dev = [
  'transform-react-jsx-source',
  'transform-react-jsx-self',
  'react-hot-loader/babel',
];

const rule_load_babel = (is_prod) => ({
  test: /\.jsx?$/,
  loader: 'babel-loader',
  include: [path.resolve(__dirname, '../src')],
  query: {
    cacheDirectory: !is_prod,
    babelrc: false,
    presets: babel_presets.concat(is_prod ? babel_presets_prod : babel_presets_dev),
    plugins: babel_plugins.concat(is_prod ? [] : babel_plugins_dev),
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

const rule_load_css = (is_prod) => ({
  test: /\.css/,
  use: [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        sourceMap: !is_prod,
        modules: true,
        localIdentName: is_prod ? '[hash:base64:6]' : '[name]-[local]-[hash:base64:6]',
        minimize: is_prod,
      },
    },
    {
      loader: 'postcss-loader',
      options: { config: path.resolve(__dirname, 'postcss.config.js') },
    },
  ],
});

const rule_load_file = (is_prod) => ({
  test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
  loader: 'file-loader',
  query: {
    name: is_prod ? '[hash:8].[ext]' : '[path][name].[ext]?[hash:8]',
  },
});

// copy index.html.template as-is
const rule_load_index = {
  test: /index\.html\.template$/,
  loader: 'file-loader',
  query: { name: '[name].[ext]' },
};


module.exports = function (is_prod) {
  return [
    rule_load_babel(is_prod),
    rule_load_html,
    rule_load_file(is_prod),
    rule_load_css(is_prod),
    rule_load_index,
  ];
};

