# cypress/base

[![Docker Pulls](https://img.shields.io/docker/pulls/cypress/base.svg?maxAge=604800)](https://hub.docker.com/r/cypress/base/)

> Docker images that include all operating system dependencies necessary to run Cypress, **but NOT Cypress itself** and no pre-installed browsers. See [cypress/included](../included) images if you need Cypress pre-installed in the image. See [cypress/browsers](../browsers) images if you need some browsers pre-installed in the image.

Each tag is named after the Node version or OS it is built on.

> **Note** All Base Images install the latest versions of NPM & Yarn.

## ⚠️ Node.js Support

Cypress 4.0+ no longer supports Node.js versions below 8.0.0. See our [Migration Guide](https://on.cypress.io/migration-guide#Node-js-8-support).

Using 6.x images is not recommended, and we do not plan to release new versions of Cypress tested on Node.js below 8.0.0.

## Information

Node release schedule at [nodejs/Release](https://github.com/nodejs/Release) and one can find LTS versions using [nvm](https://github.com/creationix/nvm) tool

```text
nvm ls-remote | grep LTS
...
  v8.16.1   (LTS: Carbon)
  v8.16.2   (LTS: Carbon)
  v8.17.0   (Latest LTS: Carbon)
...
  v10.18.0   (LTS: Dubnium)
  v10.18.1   (LTS: Dubnium)
  v10.19.0   (Latest LTS: Dubnium)
...
  v12.14.1   (LTS: Erbium)
  v12.15.0   (LTS: Erbium)
  v12.16.0   (Latest LTS: Erbium)
```
