
module.exports = {
  sourceMap: true,
  compress: {
    screw_ie8: true, // React doesn't support IE8
    warnings: false,
    unused: true,
    dead_code: true,
  },
  mangle: {
    screw_ie8: true,
  },
  output: {
    comments: false,
    screw_ie8: true,
  },
};

