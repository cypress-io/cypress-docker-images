# cypress/base-internal:22.15.1-bullseye

A Docker image with all dependencies pre-installed.

NOTE: This image is intended for internal use with https://github.com/cypress-io/cypress. It contains a few differences from the factory, such as:

#### Dependency Additions

- xauth (to run xvfb inside system-tests)
- build-essential to install `make` and other linux build packages

#### Env variables

- Does not contain the `CACHE_FOLDER` and `FACTORY_DEFAULT_NODE_VERSION` env variables to keep unit tests non environment specific
