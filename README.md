> Docker image with Cypress dependencies

[![Docker Build Status](https://img.shields.io/docker/build/cypress/base.svg)](https://hub.docker.com/r/cypress/base/)

If you want to install and run Cypress.io inside your Docker container,
we have prepared an image with Node, XVFB and other
[Cypress dependencies][cy deps].
Just run your Docker image from `cypress/base` and you should be good to go!

[cy deps]: https://docs.cypress.io/docs/continuous-integration#section-dependencies

Docker hub: [cypress/base](https://hub.docker.com/r/cypress/base/)

Note that inside the container we create a group "qa" and a new user "cypress".
All commands after that should run as `qa/cypress` user for additional security.

## Tags

* `:4` - built on top of Node 4 image
* `:6` - built on top of Node 6 image
* `:8` - built on top of Node 8 image

**note:** Node 0.12 is no longer supported by the Cypress install and should not be used.

## Example

Example user [test/Dockerfile](test/Dockerfile) with Cypress version > 0.20.0 install.

```
FROM cypress/base
RUN npm install --save-dev cypress
RUN $(npm bin)/cypress verify
RUN $(npm bin)/cypress run
```

See example [test/test.sh](test/test.sh) that runs Cypress inside a container
against mounted volume with E2E tests

## Other images

We have a few other *strictly internal* images built from this repo. These
images are used to test Cypress tools on CI and are not guaranteed to work
long term.

## Docker hub

[Docker hub notes](docker-hub.md) for Cypress developers
