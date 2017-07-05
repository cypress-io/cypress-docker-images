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

* `:0.12` - built on top of Node 0.12 image
* `:4` - built on top of Node 4 image
* `:6` - built on top of Node 6 image
* `:8` - built on top of Node 8 image

## Example

Example user [test/Dockerfile](test/Dockerfile)

```
FROM cypress/base
RUN npm install -g cypress-cli
RUN cypress install
RUN cypress verify
RUN cypress run
```

See example [test/test.sh](test/test.sh) that runs Cypress inside a container
against mounted volume with E2E tests

## Other images

We have a few other *strictly internal* images built from this repo. These
images are used to test Cypress tools on CI. They are labeled usually by
the additional feature included.

For example, we have an image based on `cypress/base` with Chrome browser
installed tagged `chrome58`.

```sh
$ docker run cypress/internal:chrome58 chrome --version
Google Chrome 58.0.3029.110
```

Internal tags on Docker hub:
[cypress/internal/tags](https://hub.docker.com/r/cypress/internal/tags/)

For increased security the `cypress/internal` images create separate non-root
user called `person`.

## Building Docker Hub

1. Open Docker hub build settings page, for example
  [cypress/internal](https://hub.docker.com/r/cypress/internal/~/settings/automated-builds/)
2. Click "Trigger" button next to the tag you would like to build

![Trigger buttons](screenshots/docker-hub-build.png)

Then look at "Build Details" tab to see the build progress, usually takes a
few minutes to finish.
