
module.exports = (isProd, contentBase, publicPath) => ({
  hot: !isProd,
  contentBase,
  publicPath,

  // historyApiFallback: true,
  // port: 3000,
  // compress: isProd,
  // inline: !isProd,

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
});

