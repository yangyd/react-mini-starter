
const path = require('path');

const target_browsers = [
    ">1%",
    "last 4 versions",
    "Firefox ESR",
    "not ie < 9",
];

function rule_load_babel(isProd) {
  const isDebug = !isProd;
  return {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    include: [path.resolve(__dirname, '../src')],
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
} // end rule_load_babel

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

function rule_load_file(isProd) {
  const isDebug = !isProd;
  return {
    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
    loader: 'file-loader',
    query: {
      name: isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
    },
  };
}

function loaders(isProd) {
  return [
    rule_load_babel(isProd),
    rule_load_html,
    rule_load_file(isProd),
    rule_load_css,
  ];
}

module.exports = loaders;

