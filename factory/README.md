# cypress/factory

[`cypress/factory`](https://hub.docker.com/r/cypress/factory) is a Docker image that can be used with [`ARG`](https://docs.docker.com/reference/dockerfile/#arg) instructions in a custom-built [`Dockerfile`](https://docs.docker.com/reference/dockerfile/) to generate a new Docker image with specific versions of:

- Node.js
- Yarn v1 Classic
- Chrome
- Firefox
- geckodriver
- Edge
- Cypress

## Tags

[cypress/factory](https://hub.docker.com/r/cypress/factory/tags) images on [Cypress on Docker Hub](https://hub.docker.com/u/cypress) use image tags in the form:

- `<factory version>`
- `latest`

for example:

- `cypress/factory:4.0.2`
- `cypress/factory:latest`

To avoid unplanned breaking changes, specify a fixed `<factory version>` tag, not the `latest` tag. The `latest` tag is linked to the latest released `cypress/factory` image and is updated without notice.

## Benefits

- Freedom to choose which versions to test against.
- No need to wait on an official release to test the latest version of a browser.
- Smaller Docker image sizes especially when not including unused browsers.
- Easily test multiple browser versions.
- Reduced maintenance and pull requests in this repo.
- Ability for Cypress to offer more variations of Docker images at low cost.

## API

The following `ARG` variable values can be set to define what versions the Docker image includes in its build.

If no `ARG` variables are defined, only the default version of Node.js will be installed. This can still be a useful container though since we will also install any dependencies required to run Cypress.

### NODE_VERSION

The version of Node.js to install in the Docker image. The exact version must be used, no wildcards or shorthands are supported. If the `ARG` variable is not defined or an empty string, the default version of Node.js (defined in [.env](./.env) as `FACTORY_DEFAULT_NODE_VERSION`) is installed. Node.js is a prerequisite for Cypress.

Example: `NODE_VERSION='20.14.0'`

[Node Versions](https://nodejs.org/en/download/releases)

### YARN_VERSION

The version of Yarn v1 Classic to install (via npm). If the `ARG` variable is unset or an empty string, Yarn is not installed.

Example: `YARN_VERSION='1.22.22'`

[Yarn v1 versions](https://www.npmjs.com/package/yarn)

[Yarn Modern](https://yarnpkg.com/) (versions 2 and above) are not supported.
They are not currently published to the npm registry and require the experimental [Corepack](https://yarnpkg.com/corepack) to [install](https://yarnpkg.com/getting-started/install).

### CYPRESS_VERSION

The version of Cypress to install (via npm). If the `ARG` variable is unset or an empty string, Cypress is not installed.

Example: `CYPRESS_VERSION='13.11.0'`

[Cypress versions](https://www.npmjs.com/package/cypress)

### CHROME_VERSION

The version of Google Chrome to install. If the `ARG` variable is unset or an empty string, Chrome is not installed. The exact version must be used, no wildcards or shorthands are supported.

Example: `CHROME_VERSION='131.0.6778.264-1'`

[Chrome versions](https://www.ubuntuupdates.org/package/google_chrome/stable/main/base/google-chrome-stable)

This browser is currently available only for the `Linux/amd64` platform.

### FIREFOX_VERSION

The version of Mozilla Firefox to install. If the `ARG` variable is unset or an empty string, Firefox is not installed. The exact version must be used, no wildcards or shorthands are supported.

Example: `FIREFOX_VERSION='134.0'`

[Firefox versions](https://download-installer.cdn.mozilla.net/pub/firefox/releases/)

This browser is available for the `Linux/amd64` platform in all versions, and for the `Linux/arm64` platform in Firefox `136.0` and above.

### GECKODRIVER_VERSION

The version of [Mozilla geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/index.html) to install. If the `ARG` variable is unset or an empty string, the `geckodriver` is not installed. The exact version must be used, no wildcards or shorthands are supported. A minimum version `0.34.0` is required.

Example: `GECKODRIVER_VERSION='0.36.0'`

[mozilla/geckodriver versions](https://github.com/mozilla/geckodriver/releases) provides drivers for both `Linux/amd64` and `Linux/arm64` platforms. Cypress release [13.15.1](https://docs.cypress.io/app/references/changelog#13-15-1), and above, require `geckodriver` when testing Firefox. If `GECKODRIVER_VERSION` is not defined, Cypress uses the npm wrapper package [geckodriver](https://www.npmjs.com/package/geckodriver) to download [mozilla/geckodriver](https://github.com/mozilla/geckodriver) at run-time. Specifying `GECKODRIVER_VERSION` is advised if testing in an air-gapped environment, and to use a defined version of `geckodriver`.

### EDGE_VERSION

The version of Microsoft Edge to install. If the `ARG` variable is unset or an empty string, Edge is not installed. The exact version must be used, no wildcards or shorthands are supported.

Example: `EDGE_VERSION='131.0.2903.112-1'`

[Edge versions](https://packages.microsoft.com/repos/edge/pool/main/m/microsoft-edge-stable/)

This browser is currently available only for the `Linux/amd64` platform.

## Usage

The Docker `cypress/factory` build process works by relying on the [`ONBUILD`](https://docs.docker.com/engine/reference/builder/#onbuild) Docker instruction to run commands at the image's build time. To make use of the Docker `cypress/factory` image and process, users will have to create a [`Dockerfile`](https://docs.docker.com/reference/dockerfile/) to declare what dependency versions are desired. Docker `ARG` variables can be specified in a number of ways, some of which are demonstrated below. For each of these examples we are building the equivalent of the `cypress/browsers` Docker image with Cypress additionally installed. In each instance, since the example is only testing the Chrome version, the examples could just install Chrome by itself if the other browsers were not used.

In the examples below, we install Cypress into the Docker image using:

```dockerfile
RUN npm install cypress --save-dev
RUN npx cypress install
```

The additional `npx cypress install` command ensures that the Cypress binary component is installed, even if the Docker build step is re-run. The [Docker build cache](https://docs.docker.com/build/cache/) process may otherwise incorrectly optimize the build and fail to include the Cypress binary in the image, leading to run failures.

### Example project

To test the following Docker build examples you need to have a Cypress project available. You can create a simple Cypress E2E project by following these steps:

```shell
mkdir cy-example-test # or another directory of your choice
cd cy-example-test
npm init -y
npm install cypress --save-dev
npx cypress open
```

In the Cypress GUI then:

- Select "E2E Testing"
- Select "Continue"
- Select "Electron" browser
- Select "Create new spec"
- Select "Create spec"
- Close all Cypress windows

Finally, test that the spec `cypress/e2e/spec.cy.js` runs:

```shell
npx cypress run
```

### In the Dockerfile

`ARG` variables can be defined directly in the `Dockerfile` to make the variables available when the container is built.

Create a `Dockerfile` with the following content:

```dockerfile
# Args are defined in the Dockerfile before the FROM command.
# Using these args will cause an image to be created with
# Node.js (default version from .env file), Chrome, Firefox and Edge.
ARG CHROME_VERSION='131.0.6778.264-1'
ARG EDGE_VERSION='131.0.2903.112-1'
ARG FIREFOX_VERSION='134.0'

FROM cypress/factory

COPY . /opt/app
WORKDIR /opt/app
RUN npm install cypress --save-dev
RUN npx cypress install
```

Then, in the same directory as the `Dockerfile`, run the following commands to build the Docker image and run Cypress against the Chrome browser.

```bash
docker build . -t test
docker run -it --rm test npx cypress run -b chrome
```

### At build time

`ARG` variables can be passed to the `docker build` command with the `--build-arg` flag. Note: any value set via the command line will override the default `ARG` variable value provided in the `Dockerfile`.

Create a `Dockerfile` with the following content:

```dockerfile
FROM cypress/factory

COPY . /opt/app
WORKDIR /opt/app
RUN npm install cypress --save-dev
RUN npx cypress install
```

Run the Docker commands:

```bash
docker build . --build-arg CHROME_VERSION='131.0.6778.264-1' --build-arg EDGE_VERSION='131.0.2903.112-1' --build-arg FIREFOX_VERSION='134.0' -t test
docker run -it --rm test npx cypress run -b chrome
```

### In docker-compose.yml

Finally, [Dockerfile `ARG`](https://docs.docker.com/reference/dockerfile/#arg) variable values can be specified in the `docker-compose.yml` file using [compose `args`](https://docs.docker.com/compose/compose-file/build/#args) build arguments.

Create a `docker-compose.yml` file with the following content:

```yml
services:
  test:
    build:
      context: .
      args:
        CHROME_VERSION: '125.0.6422.141-1'
        EDGE_VERSION: '125.0.2535.85-1'
        FIREFOX_VERSION: '126.0.1'
    command: npx cypress run
```

and a `Dockerfile` with this content:

```dockerfile
FROM cypress/factory

COPY . /opt/app
WORKDIR /opt/app
RUN npm install cypress --save-dev
RUN npx cypress install
```

Run the Docker commands:

```bash
docker compose build test
docker compose run --rm test
```

### Reducing the size of the docker container

As mentioned above we can reduce the size of the Docker image by removing browsers we aren't using.

Since this example only uses Chrome, removing Edge and Firefox is as simple as not including a version.

Create a `Dockerfile` with the following content:

```dockerfile
ARG CHROME_VERSION='131.0.6778.264-1'

FROM cypress/factory

COPY . /opt/app
WORKDIR /opt/app
RUN npm install cypress --save-dev
RUN npx cypress install
```

Then, in the same directory as the `Dockerfile`, run the following commands to build the Docker image and run Cypress against the Chrome browser.

```bash
docker build . -t test
docker run -it --rm test npx cypress run -b chrome
```

The released [cypress/base](https://hub.docker.com/r/cypress/base) image (no browsers) has a compressed size on [Docker Hub](https://hub.docker.com/u/cypress) of ~ 230 MB. The [cypress/browsers](https://hub.docker.com/r/cypress/browsers) image for `linux/amd64` has a compressed image size of ~ 840 MB. By generating a custom image with unneeded browsers removed, the image size can be correspondingly reduced.

### Proxy management

To build a custom image behind a corporate proxy, it is possible to set the optional `ARG` variable HTTP_PROXY using one of the methods described above.

Example with the `--build-arg` flag :

```bash
docker build . --build-arg HTTP_PROXY=http://my-corporate-proxy.com:3128 -t test
```

## Version Testing

Due to the large amount of possible version combinations, we're not able to exhaustively test each combination of versions, nor do we block versions that are incompatible. For example, Cypress 12 removed support for Node.js version 12.0.0. You are still able to generate a container with node 12.0.0 and Cypress 12, but Cypress will fail to run. This is because the factory supports earlier versions of Cypress and must support earlier versions of node.

If you run across a combination that should reasonably work, but doesn't, log an issue and we will take a look at supporting it.

Additionally this docker image and containers generated from it are intended for test use only, and are not intended for hosting services in a production environment.
