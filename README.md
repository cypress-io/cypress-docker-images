# Cypress Docker Images

These images provide all of the required dependencies for running Cypress in Docker.

We have two main images:

Image | Default | CI Build | Description
--- | --- | --- | ---
[cypress/base](base) | `cypress/base:8` | [![Docker Build Status](https://img.shields.io/docker/build/cypress/base.svg)](https://hub.docker.com/r/cypress/base/) | All system dependencies, no browsers.
[cypress/browsers](browsers) | `cypress/browsers:chrome67` | [![Docker Build Status](https://img.shields.io/docker/build/cypress/browsers.svg)](https://hub.docker.com/r/cypress/browsers/) | All system dependencies and browser(s).

Of these images, we provide multiple tags for various operating systems and specific browser versions. These allow you to target specific combinations you need. We only provide browsers for `Debian`, but you can use our base images and build your own.

Name + Tag | Node | Operating System | Dependences | Browsers
--- | --- | --- | --- | ---
[cypress/base:4](base/4) | 4 | Debian | ✅ | 🚫
[cypress/base:6](base/6) | 6 | Debian | ✅ | 🚫
[cypress/base:8](base/8) | 8 | Debian | ✅ | 🚫
[cypress/base:8.15.1](base/8.15.1) | 8.15.1 | Debian | ✅ | 🚫
[cypress/base:10](base/10) | 10 | Debian | ✅ | 🚫
[cypress/base:centos7](base/centos7) | 6 | CentOS | ✅ | 🚫
[cypress/base:ubuntu16](base/ubuntu16) | 6 | Ubuntu | ✅ | 🚫
[cypress/browsers:chrome67](browsers/chrome67) | 8 | Debian | ✅ | Chrome 67
[cypress/browsers:chrome69](browsers/chrome69) | 10 | Debian | ✅ | Chrome 69
[cypress/browsers:chrome67-ff57](browsers/chrome67-ff57) | 8 | Debian | ✅ | Chrome 67, FF 57

## Best practice

It is recommended to use a specific image tag, and not rely on the `default` tag. For example, it is better to use `cypress/base:8` than `cypress/base`.

## DockerHub

All of the images and tags are [published to DockerHub here](https://hub.docker.com/r/cypress).

## Examples

These images have all dependencies necessary to install and run Cypress. Just install NPM dependencies (including Cypress) and run the tests. We utilize many of these docker images in our own projects, with different CI providers.

[Check out our docs for examples.](https://on.cypress.io/docker)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)
