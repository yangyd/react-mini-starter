
React SPA Mini Starter
======================

This is a minimalist project setup for developing React SPA. The intention is to provide a solid basement for prototyping or production-ready development while avoid putting too many assumptions from the beginning (There're already lots of scarily opinionated starters out there if you like).

You are encouraged to hack the [build configuration](./build-config) directly, but if you don't change anything, you have:

- Clean & sensible Webpack configuration for both development and production (hot reload, source map, etc.)
- React JSX & [modern Javascript features](http://babeljs.io/docs/plugins/preset-stage-1/)
- [CSS Modules](https://github.com/css-modules/css-modules) and [PostCSS](http://postcss.org/)
- Assets pipeline support
- ESLint with generally followed lint rules
- Karma unit test with coverage report (see below)

A simple React application, based on the [Budget Sample App], is included as demonstration of the project setup. No server-side concern is involved so that this setup can be used along with any kind of web technology, or just for static web hosting.

## Unit test

Testing front end application is way more diversified than development, and the tools chosen have huge impact at how test cases are written and organized. The test solution included here tries to keep things simple but extendable. As said above, you are encouraged to hack the [configuration](./build-config/karma.config.js) as needed.

Test cases go under the `test/` directory and should end with `spec.js` or `test.js`. Test sources are also loaded by Webpack and Babel so ES6 and JSX syntax is available. A few tests, which uses Enzyme and Jasmine, for the example application are included as demonstration.

Test result and coverage reports are generated under the `target/test-reports` directory. The following files are generated:

```
target/
│
└───test-reports/
    │   report-junit.xml    (JUnit format report)
    │
    └───coverage/
        │   cobertura.txt   (Cobertura format coverage report)
        │   summary.txt     (Istanbul coverage summary)
        └───html/           (Istanbul coverage details)
```

## NPM Scripts

The commands for these scripts are for Windows (cmd.exe or Powershell), but it should be trivial to adapt for other system (Check the `scripts` property in `package.json`).

```
npm run build
```

Build the application. By default it builds for production, you may set a `NODE_ENV` environmental variable to anything other than `production` to switch to development mode.

The result distributables are located in the `target` directory.

```
npm start
```

Start the dev server. *Before dev server can be used, the project must be built once in development mode* (in order to prepare the index.html with proper asset pathes for the dev server).

```
npm test
```

Run unit tests with Karma and generate reports (single-run).

```
npm run karma
```

Start Karma server in watch mode

```
npm run clean
```

Nuke the `target` directory for clean build. Note this also removes test and coverage reports.

```
npm run lint
```

Lint the code with ESLint.

## TODO

- integrate ESLint into build process ([eslint-loader](https://github.com/MoOx/eslint-loader))

- fix the [prop-types] deprecation issue in example app

- more tests

[Budget Sample App]: https://github.com/ModusCreateOrg/budgeting-sample-app
[prop-types]: https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes
