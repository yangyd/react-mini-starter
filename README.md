
React SPA Starter
=================

## what's inside

- Minimalist setup for developing React SPA client.
- Modulized & sensible Webpack config (e.g. source-map, dev-server, etc)
- Babel stage-1 feature (e.g. static class members)
- Assets pipeline
- A sample app

## CLI

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





