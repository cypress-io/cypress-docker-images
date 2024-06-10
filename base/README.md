# cypress/base

[![Docker Pulls](https://img.shields.io/docker/pulls/cypress/base.svg?maxAge=604800)](https://hub.docker.com/r/cypress/base/)

> Docker images that include all operating system dependencies necessary to run Cypress, **but NOT Cypress itself** and no pre-installed browsers. See [cypress/included](../included) images if you need Cypress pre-installed in the image. See [cypress/browsers](../browsers) images if you need some browsers pre-installed in the image.

## Tags

[cypress/base](https://hub.docker.com/r/cypress/base/tags) images on [Cypress on Docker Hub](https://hub.docker.com/u/cypress) use image tags in the form:

- `<node version>`
- `latest`

for example:

- `cypress/base:20.14.0`
- `cypress/base:latest`

 To avoid unplanned breaking changes, specify a fixed `<node version>` tag, not the `latest` tag.  The `latest` tag is linked to the latest released `cypress/base` image and is updated without notice.
