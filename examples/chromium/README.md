# examples/chromium

This directory contains a simple example of a Cypress E2E test with one test spec `cypress/e2e/spec.cy.js` running using the Chromium browser.

## Non-Docker demonstration

Install Chromium on your host system.

Use regular [Cypress CLI commands](https://docs.cypress.io/guides/guides/command-line) to run Cypress with Chromium:

```shell
cd examples/chromium
npm ci
npx cypress run --browser chromium
npx cypress open --e2e --browser chromium
```

## Docker

In the Docker examples below, the Chromium browser is installed from [Debian](https://www.debian.org/distrib/packages) distribution sources. See the [Chromium package](https://packages.debian.org/search?keywords=chromium) (`bookworm (stable)` section) for `amd64` and `arm64` versions respectively.

### Docker interactive

In this example we first run the unchanged image `cypress/base` as a container:

```shell
cd examples/chromium  # Use a pre-configured simple Cypress E2E project
npm ci                # Install Cypress
docker run -it --rm -v .:/e2e -w /e2e cypress/base  # Run image as container
```

At the `bash` prompt `:/e2e#`, we can then enter the following commands:

```shell
apt-get update                      # Update package index
apt-get install chromium -y         # Install Chromium
unset CI                            # Allows to see installation progress
npx cypress install                 # Install Cypress binary into running Docker container
npx cypress run --browser chromium  # Run Cypress test
exit
```

### Docker build and run

In this example we use a customized `Dockerfile` which bases a new image on `cypress/base`, copies the complete Cypress project into the image, including installed dependencies, then installs Chromium and the Cypress binary into the image.

The file is [examples/chromium/Dockerfile](./Dockerfile) and it has the following contents:

```dockerfile
FROM cypress/base
COPY . /opt/app
WORKDIR /opt/app
RUN apt-get update              # Update package index
RUN apt-get install chromium -y # Install Chromium
RUN npx cypress install         # Install Cypress binary
```

We build the new image, run the container from the image and execute the Cypress command `npx cypress run --browser chromium` to run the test using Chromium:

```shell
cd examples/chromium             # Use a pre-configured simple Cypress E2E project
npm ci                           # Install all dependencies
docker build . -t test-chromium  # Build a new image
docker run -it --rm --entrypoint bash test-chromium -c "npx cypress run --browser chromium" # Run Cypress test using Chromium
```
