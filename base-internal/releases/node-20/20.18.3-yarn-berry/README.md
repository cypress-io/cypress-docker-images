# cypress/base-internal:20.18.3-yarn-berry

A Docker image with all dependencies pre-installed.

NOTE: This image is intended for internal use with https://github.com/cypress-io/cypress. It contains a few differences from the factory, such as:

#### Dependency Additions
* xauth (to run xvfb inside system-tests)
* build-essential to install `make` and other linux build packages
* has yarn 4 to test yarn PnP dependencies with Cypress in order to verify the `@cypress/webpack-batteries-included-preprocessor` works with yarn PnP (without `node_modules`)

#### Env variables
* Does not contain the `CACHE_FOLDER` and `FACTORY_DEFAULT_NODE_VERSION` env variables to keep unit tests non environment specific
