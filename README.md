
React SPA Mini Starter
======================

This is a minimalist project setup for developing React SPA. The intention is to provide a solid basement for development or prototyping while avoid putting too many assumptions at the beginning (There're already lots of choices for heavily opinionated starters out there).

You are encouraged to hack the [build configuration](./build-config) directly, but if you don't change anything, you have:

- Modulized & sensible Webpack config for both development and production (hot reload, source map, etc.)
- React JSX, ES6 with TC39 stage-1 features
- CSS Modules and PostCSS (including only a few PostCSS plugins, add as you need)
- Assets pipeline support
- ESLint with generally followed lint rules
- Unit test support (see below)


A simple React application, based on the [Budget Sample App], is included as example of the build.
There's no server-side concern involved, so this setup can be used along with any kind of web technology, or just for static web hosting.

## Unit test

Testing front end application is way more diversified than development, and the tools chosen have huge impact at how test cases are written and organized. The test solution included here tries to keep things simple and extendable.

Test cases are supposed to be put in the `test/` directory and ends with `spec.js` or `test.js`. Test sources are also loaded by Webpack with similar settings of the application sources so ES6 and JSX syntax is available. Some example cases are included.

The test framework is Enzyme + Jasmine, more sophisticated tools like Sinon are not included, and only PhantomJS is included as test browser in the [Karma config](./build-config/karma.config.js). As said above, you are encouraged to hack the config as need.


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

Start the dev server. Before dev server can be used, the project must be built once in development mode (to prepare the index.html with proper asset pathes for the dev server).

```
npm run clean
```

Removes the `target` directory for clean build.

```
npm run lint
```

Lint the code with ESLint.

## TODO

- integrate ESLint into build process ([eslint-loader](https://github.com/MoOx/eslint-loader))


[Budget Sample App]: https://github.com/ModusCreateOrg/budgeting-sample-app
