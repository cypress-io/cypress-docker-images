# Running cypress/included image with additional plugins

You can run Cypress installed globally in `cypress/included:...` image and use locally installed plugins. You just need to install the plugins first. For example, in `src` folder we have End-to-end tests and [package.json](src/package.json) that lists [@cypress/skip-test](https://github.com/cypress-io/cypress-skip-test) and [cypress-failed-log](https://github.com/bahmutov/cypress-failed-log) development dependencies.

First, install dependencies using NPM

```shell
cd src
npm install
```

The local dependencies will be added to `node_modules` folder.

Second, change back from `src` folder to the example folder and run tests

```shell
cd ..
pwd
docker run -it -v $PWD/src:/test -w /test cypress/included:3.8.0
...
```

The tests should be able to load locally installed plugins from [cypress/plugins/index.js](src/cypress/plugins/index.js) and [cypress/support/index.js](src/cypress/support/index.js) files.

**Tip:** if you need to install Cypress plugins locally, you might as well [install Cypress locally](https://on.cypress.io/installing-cypress). Just make sure to [cache it on CI](https://on.cypress.io/caching).
