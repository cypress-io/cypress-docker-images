# cypress/browsers

[![Docker Pulls](https://img.shields.io/docker/pulls/cypress/browsers.svg?maxAge=604800)](https://hub.docker.com/r/cypress/browsers/)

> Image with all operating system dependencies and a pre-installed browser, **but NOT the test runner itself**. See [cypress/included](../included) images if you need pre-installed Cypress in the image.

Image `cypress/browsers:chrome69` is tagged [`latest`](https://hub.docker.com/r/cypress/browsers/tags/)

- Node 6 + Chrome 63 + Firefox 57 [/chrome63-ff57](chrome63-ff57)
- Node 8 + Chrome 65 + Firefox 57 [/chrome65-ff57](chrome65-ff57)
- Node 8 + Chrome 67 + Firefox 57 [/chrome67-ff57](chrome67-ff57)
- Node 8 + Chrome 67 [/chrome67](chrome67)
- Node 8.2.1 + Chrome 73 [/node8.2.1-chrome73](node8.2.1-chrome73)
- Node 8.9.3 + Chrome 73 [/node8.9.3-chrome73](node8.9.3-chrome73)
- Node 8.15.1 + Chrome 73 [/node8.15.1-chrome73](node8.15.1-chrome73)
- Node 10 + Chrome 69 [/chrome69](chrome69)
- Node 10.2.1 + Chrome 74 [/node10.2.1-chrome74](node10.2.1-chrome74)
- Node 11.13.0 + Chrome 73 [/node11.13.0-chrome73](node11.13.0-chrome73)

We only provide browsers for `Debian`, but you can use our base images and build your own. See Cypress [Docker documentation](https://on.cypress.io/docker).
