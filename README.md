# Docker image with Cypress.io dependencies

[![Docker Build Status](https://img.shields.io/docker/build/cypress/base.svg)](https://hub.docker.com/r/cypress/base/)

**TL;DR** If you want to install and run Cypress.io inside your Docker container, we have prepared an image with Node, XVFB and other [Cypress dependencies][cy deps]. Just run your Docker image from `cypress/base` and you should be good to go!

[cy deps]: https://docs.cypress.io/docs/continuous-integration#section-dependencies

## Available base images

You can see current list of `cypress/base` tags at the Docker hub: 
[cypress/base/tags](https://hub.docker.com/r/cypress/base/tags/)

* `cypress/base` - latest default image, built on top of Node 6, see [Dockerfile](Dockerfile)
* `cypress/base:4` - built on top of Node 4 image, see [Dockerfile](https://github.com/cypress-io/cypress-docker-images/blob/node4/Dockerfile)
* `cypress/base:6` - built on top of Node 6 image, see [Dockerfile](https://github.com/cypress-io/cypress-docker-images/blob/node6/Dockerfile)
* `cypress/base:8` - built on top of Node 8 image, see [Dockerfile](https://github.com/cypress-io/cypress-docker-images/blob/node8/Dockerfile)
* `cypress/base:centos7` - example built on top of Centos7 image, [Dockerfile](https://github.com/cypress-io/cypress-docker-images/blob/centos7/Dockerfile)
* `cypress/base:ubuntu16` - example built on top of Ubuntu 16.04 image, [Dockerfile](https://github.com/cypress-io/cypress-docker-images/blob/ubuntu16/Dockerfile)

**note:** Node 0.12 is no longer supported by the Cypress install and should not be used.

## Example

Example user [test/Dockerfile](test/Dockerfile) with Cypress version > 0.20.0 install.

```
FROM cypress/base
RUN npm install --save-dev cypress
RUN $(npm bin)/cypress verify
RUN $(npm bin)/cypress run
```

See example [test/test.sh](test/test.sh) that runs Cypress inside a container against mounted volume with E2E tests

## CI Example

- [CircleCI example](https://github.com/cypress-io/cypress-example-docker-circle), see how `cypress/base` image is used in the [circle.yml](https://github.com/cypress-io/cypress-example-docker-circle/blob/master/circle.yml) file.

More working CI examples available at [](https://docs.cypress.io/guides/guides/continuous-integration.html#Docker)

## Additional Browsers

We also build an image with a [Chrome browser included](browsers/chrome/Dockerfile). The image is based on `cypress/base:6` and is called `cypress/browsers:chrome62`. With this image you can install Cypress and test using `cypress run --browser chrome`.

## Links

* [Cypress.io Website](https://www.cypress.io/)
* [Cypress.io Docs](https://on.cypress.io/)
