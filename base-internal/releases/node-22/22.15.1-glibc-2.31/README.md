# cypress/base-internal:22.15.1-bullseye-glibc2.31

A Docker image with all dependencies pre-installed. This image is labeled separately from the other bullseye images, because it is used in a specific step in the Cypress CI process. As a part of the build process, Cypress' CI builds an optimized version of `better-sqlite3`'s addon. The range of operating systems this addon can be used in is determined by the glibc version of the system that builds it.

This image is labeled according the the glibc version so that the Cypress CI pipeline is more self-documenting when it comes to the minimum glibc version required to run Cypress.

It may require additional dependencies for this build process; for example, in Buster, we needed
to upgrade both Python and GCC. In Bullseye, we need to downgrade Python.

NOTE: This image is intended for internal use with https://github.com/cypress-io/cypress. It contains a few differences from the factory, such as:

#### Dependency Additions

- xauth (to run xvfb inside system-tests)
- build-essential to install `make` and other linux build packages
- python3.8 to be able to build better-sqlite3

#### Env variables

- Does not contain the `CACHE_FOLDER` and `FACTORY_DEFAULT_NODE_VERSION` env variables to keep unit tests non environment specific
