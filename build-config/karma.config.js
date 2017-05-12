
const basePath = '..'; // project root
const report_dir = 'target/test-reports';

const specReporter = {
  maxLogLines: 5,
  suppressErrorSummary: true,
  suppressFailed: false,
  suppressPassed: false,
  suppressSkipped: true,
  showSpecTiming: false,
  failFast: true,
};

const coverageReporter = {
  dir: report_dir + '/coverage',
  reporters: [
    { type: 'html', subdir: 'html' },
    { type: 'text', subdir: '.', file: 'summary.txt' },
    { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
  ],
};

const junitReporter = {
  outputDir: report_dir,
  outputFile: 'report-junit.xml',
  suite: '',
  useBrowserName: true,
  nameFormatter: undefined,
  classNameFormatter: undefined,
  properties: {},
  xmlVersion: null,
};

const coverageIstanbulReporter = {
  reports: ['text-summary'],
  fixWebpackSourcePaths: true,
};


// https://github.com/airbnb/enzyme/blob/master/docs/guides/webpack.md
// https://github.com/lelandrichardson/enzyme-example-karma-webpack
// https://github.com/erikras/react-redux-universal-hot-example

const config = {
  basePath,
  files: ['test/test-index.js'],
  preprocessors: {
    'test/test-index.js': ['webpack', 'sourcemap'],
  },
  frameworks: ['jasmine'],
  exclude: [],
  webpack: require('./karma-webpack')(),

  reporters: ['progress'],

  // reporters: ['progress', 'coverage-istanbul'],
  // coverageIstanbulReporter,

  // reporters: ['spec', 'junit', 'coverage'],
  // specReporter,
  // junitReporter,
  // coverageReporter,

  browsers: ['PhantomJS'],
  port: 9876,
  colors: true,
  concurrency: Infinity,
};

module.exports = karma => {
  config.logLevel = karma.LOG_INFO;
  return karma.set(config);
};

