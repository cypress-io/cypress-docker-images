# Cypress Docker Images

[![Docker Build Status](https://img.shields.io/docker/build/cypress/base.svg)](https://hub.docker.com/r/cypress/base/)

These images provide all of the required dependencies for running Cypress in Docker.

We have two main images:

Image | Default | Description
--- | ---
cypress/base | `cypress/base:6` | All system dependencies, no browsers.
cypress/browsers | `cypress/browsers:chrome63` | All system dependencies, with browser(s).

Of these images, we provide multiple tags for various operating systems and specific browser versions. These allow you to target specific combinations you need. We only provide browsers for `Debian`, but you can use our base images and build your own.

Name + Tag | Node | Operating System | Dependences | Browsers
--- | --- | --- | ---
cypress/base:4 | 4 | Debian | ✅ | 🚫
cypress/base:6 | 6 | Debian | ✅ | 🚫
cypress/base:8 | 8 | Debian | ✅ | 🚫
cypress/base:centos7 | 6 | CentOS | ✅ | 🚫
cypress/base:ubuntu16 | 6 | Ubuntu | ✅ | 🚫
cypress/browsers:chrome62 | 6 | Debian | ✅ | Chrome 62
cypress/browsers:chrome63 | 6 | Debian | ✅ | Chrome 63

## DockerHub

All of the images and tags are [published to DockerHub here](https://hub.docker.com/r/cypress).

## Examples

We utilize many of these docker images in our own projects, with different CI providers.

[Check out our docs for a examples.](https://on.cypress.io/docker)
