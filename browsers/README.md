# cypress/browsers

[![Docker Pulls](https://img.shields.io/docker/pulls/cypress/browsers.svg?maxAge=604800)](https://hub.docker.com/r/cypress/browsers/)

> Docker image with all operating system dependencies and some pre-installed browsers, **but NOT Cypress itself**. See [cypress/included](../included) images if you need Cypress pre-installed in the image.

## Platforms

`cypress/browsers` images are available for `Linux/amd64` and `Linux/arm64` platforms.
`Linux/arm64` images do **not** currently contain additional browsers.

## Tags

[cypress/browsers](https://hub.docker.com/r/cypress/browsers/tags) images on [Cypress on Docker Hub](https://hub.docker.com/u/cypress) use image tags in the form:

- node-`<node version>`-chrome-`<chrome version>`-ff-`<firefox version>`-edge-`<edge version>`
- `latest`

for example:

- `cypress/browsers:node-20.14.0-chrome-125.0.6422.141-1-ff-126.0.1-edge-125.0.2535.85-1`
- `cypress/browsers:latest`

To avoid unplanned breaking changes, specify a fixed `<node version>` & `<browser version>` combination tag, not the `latest` tag.  The `latest` tag is linked to the latest released `cypress/browsers` image and is updated without notice.

## CMD

When running a container from a `cypress/browsers` image, `bash` is executed, as defined by the [CMD](https://docs.docker.com/reference/dockerfile/#cmd) parameter of the image.

### Docker interactive

In this example we first run the unchanged image `cypress/browsers` as a container:

```shell
cd examples/basic         # Use a pre-configured simple Cypress E2E project
npm ci                    # Install Cypress
docker run -it --rm -v .:/e2e -w /e2e cypress/browsers  # Run image as container
```

At the `bash` prompt `:/e2e#`, we can then enter the following commands:

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
docker build . -f Dockerfile.browsers -t test-browsers  # Build a new image
docker run -it --rm --entrypoint bash test-browsers -c "npx cypress run -b chrome" # Run Cypress test in container using Chrome
```
