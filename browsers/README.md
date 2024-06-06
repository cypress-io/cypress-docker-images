# cypress/browsers

[![Docker Pulls](https://img.shields.io/docker/pulls/cypress/browsers.svg?maxAge=604800)](https://hub.docker.com/r/cypress/browsers/)

> Docker image with all operating system dependencies and some pre-installed browsers, **but NOT Cypress itself**. See [cypress/included](../included) images if you need Cypress pre-installed in the image.

## Tags

[cypress/browsers](https://hub.docker.com/r/cypress/browsers/tags) images on [Cypress on Docker Hub](https://hub.docker.com/u/cypress) use image tags in the form:

- node-`<node version>`-chrome-`<chrome version>`-ff-`<firefox version>`-edge-`<edge version>`
- `latest`

for example:

- `cypress/browsers:node-20.14.0-chrome-125.0.6422.141-1-ff-126.0.1-edge-125.0.2535.85-1`
- `cypress/browsers:latest`

 To avoid unplanned breaking changes, specify a fixed `<node version>` & `<browser version>` combination tag, not the `latest` tag.  The `latest` tag is linked to the latest released `cypress/browsers` image and is updated without notice.
