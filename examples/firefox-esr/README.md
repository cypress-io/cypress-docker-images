# examples/firefox-esr

This directory contains a simple example of a Cypress E2E test with one test spec `cypress/e2e/spec.cy.js` running using the [Mozilla Firefox](https://www.mozilla.org/firefox) browser from the ESR (Extended Support Release) channel.

[Choosing a Firefox update channel](https://support.mozilla.org/en-US/kb/choosing-firefox-update-channel) explains the Firefox "Extended Support Release (ESR)".

## Non-Docker demonstration

Install Firefox ESR on your host system.

Use regular [Cypress CLI commands](https://docs.cypress.io/guides/guides/command-line) to run Cypress with Firefox (ESR):

```shell
cd examples/firefox-esr
npm ci
npx cypress run --browser firefox
npx cypress open --e2e --browser firefox
```

## Docker

In the Docker examples below, the Firefox ESR browser is installed from [Debian](https://www.debian.org/distrib/packages) distribution sources. See the [firefox-esr package](https://packages.debian.org/search?keywords=firefox-esr) (`bookworm (stable)` section) covering `amd64 arm64 armhf i386 mips64el ppc64el s390x` processor architectures.

### Docker interactive

In this example we first run the unchanged image `cypress/base` as a container:

```shell
cd examples/firefox-esr  # Use a pre-configured simple Cypress E2E project
npm ci                # Install Cypress
docker run -it --rm -v .:/app -w /app cypress/base  # Run image as container
```

At the `bash` prompt `:/app#`, we can then enter the following commands:

```shell
apt-get update                     # Update package index
apt-get install firefox-esr -y     # Install Firefox ESR
unset CI                           # Allows to see installation progress
npx cypress install                # Install Cypress binary into running Docker container
npx cypress run --browser firefox  # Run Cypress test
exit
```

### Docker build and run

In this example we use a customized `Dockerfile` which bases a new image on `cypress/base`, copies the complete Cypress project into the image, including installed dependencies, then installs Firefox ESR and the Cypress binary into the image.

The file is [examples/firefox-esr/Dockerfile](./Dockerfile) and it has the following contents:

```dockerfile
FROM cypress/base
COPY . /opt/app
WORKDIR /opt/app
RUN apt-get update                 # Update package index
RUN apt-get install firefox-esr -y # Install Firefox ESR
RUN npx cypress install            # Install Cypress binary
```

We build the new image, run the container from the image and execute the Cypress command `npx cypress run --browser firefox` to run the test using Firefox ESR:

```shell
cd examples/firefox-esr             # Use a pre-configured simple Cypress E2E project
npm ci                              # Install all dependencies
docker build -t test-firefox-esr . # Build a new image
docker run -it --rm --entrypoint bash test-firefox-esr -c "npx cypress run --browser firefox" # Run Cypress test using Firefox ESR
```
