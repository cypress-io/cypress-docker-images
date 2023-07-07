# cypress/browsers-internal:node18.15.0-chrome114-ff115

A complete image with all operating system dependencies for Cypress, and Chrome 114.0.5735.198-1, Firefox 115.0.1, Edge undefined browsers.

NOTE: This image is intended for internal use with https://github.com/cypress-io/cypress. It contains a few differences from the factory, such as:

#### Dependency Additions
* curl
* build-essentials (to contain `make` and a few other dependencies)

#### Env variables
* Does not contain the `CACHE_FOLDER` and `FACTORY_DEFAULT_NODE_VERSION` env variables to keep unit tests non environment specific

[Dockerfile](Dockerfile)

**Note:** this image uses the `root` user. You might want to switch to non-root user like `node` when running this container for security

**Note:** Currently, the linux/arm64 build of this image does not contain any browsers except Electron. See https://github.com/cypress-io/cypress-docker-images/issues/695 for more information.
