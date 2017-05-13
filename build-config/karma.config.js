
const basePath = '..'; // project root
const report_dir = 'target/test-reports';

// Config test & coverage reporters
const specReporter = {
  maxLogLines: 5,
  suppressErrorSummary: true,
  suppressFailed: false,
  suppressPassed: false,
  suppressSkipped: true,
  showSpecTiming: false,
  failFast: true,
};

const junitReporter = {
  outputDir: report_dir,
  outputFile: 'report-junit.xml',
  suite: '',
  useBrowserName: false,
  nameFormatter: undefined,
  classNameFormatter: undefined,
  properties: {},
  xmlVersion: null,
};

const coverageIstanbulReporter = {
  dir: report_dir + '/coverage',
  reports: ['text', 'html', 'cobertura'],

  fixWebpackSourcePaths: true,
  skipFilesWithNoCoverage: true,

  'report-config': {
    html: { subdir: 'html' },
    text: { subdir: '.', file: 'summary.txt' },
    cobertura: { subdir: '.', file: 'cobertura.txt' },
  },
};


// Assemble the Karma configuration
const config = {
  basePath,
  files: ['test/test-index.js'], // entry point of karma-webpack
  preprocessors: {
    'test/test-index.js': ['webpack', 'sourcemap'],
  },
  frameworks: ['jasmine'],
  exclude: [],

  webpack: require('./karma-webpack')(),
  webpackServer: { noInfo: true },

  reporters: 'spec,junit,coverage-istanbul'.split(','),
  specReporter,
  junitReporter,
  coverageIstanbulReporter,

  browsers: ['PhantomJS'],
  port: 9876,
  colors: true,
  concurrency: Infinity,
};

module.exports = karma => {
  config.logLevel = karma.LOG_INFO;
  return karma.set(config);
};

