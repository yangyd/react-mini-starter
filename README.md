
React SPA Starter
=================

## what's inside

This is a minimalist project setup for developing React SPA client. You are encouraged to hack the [Webpack configuration](./build-config) directly. By default it includes:

- Modulized & sensible Webpack config for both production/development environment
- ES6 with TC39 stage-1 feature
- CSS Modules and PostCSS (only a few basic PostCSS plugins are included)
- Assets pipeline support
- A sample budget application, based on the example in https://github.com/ModusCreateOrg/budgeting-sample-app

## NPM Scripts

```
npm run build
```

Build the application. By default it builds for production, you may set `NODE_ENV` environmental variable to anything other than `production` to enable development mode.

Binaries generated are in the `target` directory.

```
npm start
```

Start the dev server. Before dev server can be used, the project must be built once in development mode (to prepare the index.html for dev server).

```
npm run clean
```

Removes the `target` directory.



#### 路线图

1. migrate to webpack 2
2. clean up webpack.config.js
3. check https://webpack.js.org/guides/hmr-react/
4. integrate others.config.js
