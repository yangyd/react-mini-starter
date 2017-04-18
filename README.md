
React SPA Mini Starter
=================

This is a minimalist project setup for developing React SPA. The intention is to provide a solid basement for development or prototyping while avoid putting too many assumptions at the beginning (There're already lots of choices for heavily opinionated starters out there).

You are encouraged to hack the [build configuration](./build-config) directly. By default it includes:

- Modulized & sensible Webpack config for both production and development (e.g. source map, dev server, etc.)
- JSX, ES6 with TC39 stage-1 features
- CSS Modules and PostCSS (including only a few PostCSS plugins, add as you need)
- Assets pipeline support
- ESLint with generally followed lint rules
- A sample application, based on the [Budget Sample App](https://github.com/ModusCreateOrg/budgeting-sample-app)

There's no server-side concern involved so that this setup can be used with any backend technology, or just for static web hosting.

## NPM Scripts

The commands for these scripts are for Windows (cmd.exe or Powershell), but it should be trivial to adapt for other system (Check the `scripts` property in `package.json`).

```
npm run build
```

Build the application. By default it builds for production, you may set a `NODE_ENV` environmental variable to anything other than `production` to switch to development mode.

Distributables built are located in the `target` directory.

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
