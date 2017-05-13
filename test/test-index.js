
// The entry point of karma-webpack
const context = require.context('.', true, /(spec|test)\.jsx?$/);
context.keys().forEach(context);

