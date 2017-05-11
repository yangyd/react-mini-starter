
// entry point of karma-webpack
var context = require.context('.', true, /(spec|test)\.jsx?$/);
context.keys().forEach(context);

