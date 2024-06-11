# cypress/base

[![Docker Pulls](https://img.shields.io/docker/pulls/cypress/base.svg?maxAge=604800)](https://hub.docker.com/r/cypress/base/)

> Docker images that include all operating system dependencies necessary to run Cypress, **but NOT Cypress itself** and no pre-installed browsers. See [cypress/included](../included) images if you need Cypress pre-installed in the image. See [cypress/browsers](../browsers) images if you need some browsers pre-installed in the image.

## Tags

[cypress/base](https://hub.docker.com/r/cypress/base/tags) images on [Cypress on Docker Hub](https://hub.docker.com/u/cypress) use image tags in the form:

- `<node version>`
- `latest`

for example:

- `cypress/base:20.14.0`
- `cypress/base:latest`

To avoid unplanned breaking changes, specify a fixed `<node version>` tag, not the `latest` tag.  The `latest` tag is linked to the latest released `cypress/base` image and is updated without notice.

## CMD

When running a container from a `cypress/base` image, `bash` is executed, as defined by the [CMD](https://docs.docker.com/reference/dockerfile/#cmd) parameter of the image.

### Docker interactive

In this example we first run the unchanged image `cypress/base` as a container:

```shell
cd examples/basic         # Use a pre-configured simple Cypress E2E project
npm ci                    # Install Cypress
docker run -it --rm -v .:/e2e -w /e2e cypress/base  # Run image as container
```

At the `bash` prompt `:/e2e#`, we can then enter the following commands:

```shell
npx cypress install       # Install Cypress binary into running Docker container
npx cypress run           # Run Cypress test
```

### Docker build and run

In this example we use a customized `Dockerfile` which bases a new image on `cypress/base`, copies the complete Cypress project into the image, including installed dependencies, then installs the Cypress binary.

The file is [examples/basic/Dockerfile.base](../examples/basic/Dockerfile.base) and it has the following contents:

```dockerfile
FROM cypress/base
COPY . /opt/app
WORKDIR /opt/app
RUN npx cypress install # Install Cypress binary into image
```

We build the new image, run the container from the image and execute the Cypress command `npx cypress run` to run the test:

```shell
cd examples/basic         # Use a pre-configured simple Cypress E2E project
npm ci                    # Install Cypress
docker build . -f Dockerfile.base -t test-base  # Build a new image
docker run -it --rm --entrypoint bash test-base -c "npx cypress run" # Run Cypress test in container
```
