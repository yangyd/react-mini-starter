
React SPA Mini Starter
======================

This is a minimalist project setup for developing React SPA. The intention is to provide a solid basement for prototyping or production-ready development, but not to put too much assumption at the beginning, so that the project can be easily customized as needed.

You are encouraged to directly hack the [build configuration](./build-config)., If you don't change anything, you will have:

- Sensible Webpack configuration for both development and production (hot reload, source map, etc.)
- [modern Javascript](http://babeljs.io/docs/plugins/preset-stage-2/) and JSX
- [CSS Modules](https://github.com/css-modules/css-modules) and [PostCSS](http://postcss.org/)
- Assets pipeline intergation
- ESLint with recommended rules
- Unit test and coverage report

This is not a setup for "isomorphic" or universal Javascript. Server-side concern is not involved so that application built can be easily integrated into any kind of web technology, or just for static web hosting.

A simple application is included as a demonstration of the setup. The application is based on this [Budget Sample App], but largely reworked to meet best practices of React.

## Usage

Basically you work in the following directories. Source code goes under `src/` and unit test under `test/`, and built distributables will be generated under `target/`. `build-config/` contains all the build-related configuration (Webpack, Babel, Karma, etc.).

`index.jsx` is the entry point of the application. `index.html.template` is used to generate the ready-to-deploy `index.html` with hashed assets URLs automatically woven. This is ideal for static site, but if you want intergation with other backend, you can easily [customize it](./sbin/insert-asset-path.js).

```
  build-config/
  src/
    index.jsx
    index.html.template
  target/
  test/
```


## Commands

You also have the following NPM scripts at disposal. _Please note that commands are writen for Windows (cmd.exe or Powershell), if you are on *nix you need to modify them accordingly_ (only [trival change of path delimiters](./package.json#L57-L65)).

```
npm run build
```

Build the application. By default it builds for production, you may set a `NODE_ENV` environmental variable to anything other than `production` to switch to development mode.

The result distributables are located in the `target` directory.

```
npm start
```

Start the Webpack dev server. **Before starting the dev server, the project must be built once in development mode** (This is to prepare the index.html with proper asset pathes so that the dev server can locate them).

```
npm test
```

Run unit tests with Karma and generate reports (single-run). The code will be linted befor test cases are executed.

```
npm run karma
```

Start Karma server in watch mode

```
npm run clean
```

Nuke the `target` directory for clean build. *Please note this also removes the test report.*

```
npm run lint
```

Lint the code with ESLint.

## Unit test

The test solution chosen in the setup tries to keep things simple and flexible. As said above, you are encouraged to hack the [configuration](./build-config/karma.config.js) as needed.

Test cases go under the `test/` directory and should end with `spec.js` or `test.js`. Test sources are also loaded by Webpack and Babel so you can code the same way as application code. A few tests, which uses Enzyme and Jasmine, for the sample application are included as demonstration.

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

## Lisence

The sample application in `src/` is licensed under MIT. Everything else is released under WTFPL.

[Budget Sample App]: https://github.com/ModusCreateOrg/budgeting-sample-app
[prop-types]: https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes

