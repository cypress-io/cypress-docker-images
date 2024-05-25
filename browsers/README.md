# cypress/browsers

[![Docker Pulls](https://img.shields.io/docker/pulls/cypress/browsers.svg?maxAge=604800)](https://hub.docker.com/r/cypress/browsers/)

> Docker image with all operating system dependencies and some pre-installed browsers, **but NOT Cypress itself**. See [cypress/included](../included) images if you need Cypress pre-installed in the image.

To find the available Chrome versions, check [https://chromium.cypress.io/](https://chromium.cypress.io/).

## Naming scheme

Each Docker image is named `cypress/browsers:node<full Node version>-chrome<Chrome major version>`. If the image has Firefox browser, then it is named `cypress/browsers:node<full Node version>-chrome<Chrome major version>-ff<Firefox major version>`.

## Other images

We only provide browsers for `Debian`, but you can use our base images and build your own. See Cypress [Docker documentation](https://on.cypress.io/docker).

## Tags

You can find all published image tags at [Docker Hub](https://hub.docker.com/r/cypress/browsers/tags/). We recommend using a full image tag, rather than `latest` for immutable builds.

```
# NOT RECOMMENDED
FROM cypress/browsers:latest

# Best practice
FROM cypress/browsers:node13.6.0-chrome80-ff72
```
