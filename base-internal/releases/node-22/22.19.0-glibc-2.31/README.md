# cypress/base-internal:22.19.0-glibc-2.31

A Docker image with all dependencies pre-installed based on Debian Bullseye with glibc 2.31 and Python 3.8.

NOTE: This image is intended for internal use with https://github.com/cypress-io/cypress. It contains a few differences from the factory, such as:

#### Dependency Additions

- xauth (to run xvfb inside system-tests)
- build-essential to install `make` and other linux build packages
- Python 3.8 (downgraded from 3.9 for compatibility)

#### Env variables

- Does not contain the `CACHE_FOLDER` and `FACTORY_DEFAULT_NODE_VERSION` env variables to keep unit tests non environment specific
