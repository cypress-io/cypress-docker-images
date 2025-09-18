# cypress/browsers

[![Docker Pulls](https://img.shields.io/docker/pulls/cypress/browsers.svg?maxAge=604800)](https://hub.docker.com/r/cypress/browsers/)

> Docker image with all operating system dependencies and some pre-installed browsers, **but NOT Cypress itself**. See [cypress/included](../included) images if you need Cypress pre-installed in the image.

## Platforms

`cypress/browsers` images are available for `Linux/amd64` and `Linux/arm64` platforms.
`Linux/arm64` images contain no Chrome or Edge browsers. Firefox is included in `Linux/arm64` images starting with Firefox `136.0.2`.

## Tags

[cypress/browsers](https://hub.docker.com/r/cypress/browsers/tags) images on [Cypress on Docker Hub](https://hub.docker.com/u/cypress) use image tags in the form:

- `node-<node version>-chrome-<chrome version>-ff-<firefox version>-edge-<edge version>`
- `<node version>`<br>This is a moveable short-form convenience tag, equivalent to the above full tag.
- `latest`

for example:

- `cypress/browsers:node-22.19.0-chrome-139.0.7258.154-1-ff-142.0.1-edge-139.0.3405.125-1`
- `cypress/browsers:22.19.0`
- `cypress/browsers:latest`

To avoid unplanned breaking changes, specify a fixed `<node version>` & `<browser version>` combination tag.

The short-form `<node version>` convenience tag is linked to the latest image release for the named Node.js version. The contents of the image may be updated with newer browser versions without notice when they are released. `cypress/browsers:22.11.0` is the first image with a `cypress/browsers` short-form tag. Previously published `cypress/browsers` images do not have the short-form tag available.

The `latest` tag is linked to the latest released `cypress/browsers` image for the [Node.js Active LTS version](https://github.com/nodejs/release#release-schedule) and is updated without notice.

## CMD

When running a container from a `cypress/browsers` image, `bash` is executed, as defined by the [CMD](https://docs.docker.com/reference/dockerfile/#cmd) parameter of the image.

### Docker interactive

In this example we first run the unchanged image `cypress/browsers` as a container:

```shell
cd examples/basic         # Use a pre-configured simple Cypress E2E project
npm ci                    # Install Cypress
docker run -it --rm -v .:/app -w /app cypress/browsers  # Run image as container
```

At the `bash` prompt `:/app#`, we can then enter the following commands:

```shell
npx cypress install       # Install Cypress binary into running Docker container
npx cypress run -b chrome # Run Cypress test in Chrome
```

### Docker build and run

In this example we use a customized `Dockerfile` which bases a new image on `cypress/browsers`, copies the complete Cypress project into the image, including installed dependencies, then installs the Cypress binary.

The file is [examples/basic/Dockerfile.browsers](../examples/basic/Dockerfile.browsers) and it has the following contents:

```dockerfile
FROM cypress/browsers
COPY . /opt/app
WORKDIR /opt/app
RUN npx cypress install # Install Cypress binary into image
```

We build the new image, run the container from the image and execute the Cypress command `npx cypress run -b chrome` to run the test using the Chrome browser:

```shell
cd examples/basic         # Use a pre-configured simple Cypress E2E project
npm ci                    # Install Cypress
docker build -f Dockerfile.browsers -t test-browsers . # Build a new image
docker run -it --rm --entrypoint bash test-browsers -c "npx cypress run -b chrome" # Run Cypress test in container using Chrome
```
