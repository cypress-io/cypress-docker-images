# cypress/factory

`cypress/factory` is a docker image that can be used with docker [`args`](https://docs.docker.com/engine/reference/builder/#arg) to generate a docker container with specific versions of:

* node
* yarn
* chrome
* firefox
* edge
* cypress

## Benefits

* Freedom to choose which versions to test against.
* No need to wait on an official release to test the latest version of a browser.
* Smaller docker sizes especially when not including unused browsers.
* Easily test multiple browser versions.
* Reduced maintenance and pull requests for the cypress-docker repo.
* Ability for Cypress to offer more variations of docker containers at low cost.

## API

The following args can be set to define what versions the cypress factory docker image includes in its final build.

If no args are defined, only the default version of node will be installed. This can still be a useful container though since we will also install any dependencies required to run cypress.

### NODE_VERSION

The version of Node to install in the docker container. If the env is unset or an empty string, the default version of Node (defined [here](./.env)) is installed. Node is required. The exact version must be used, no wildcards or shorthands are supported.

Example: `NODE_VERSION='16.18.1'`

[Node Versions](https://nodejs.org/en/download/releases)

### YARN_VERSION

The version of yarn to install (via npm). If the env is unset or an empty string, Yarn is not installed.

Example: `YARN_VERSION='1.22.19'`

[Yarn versions](https://www.npmjs.com/package/yarn)

### CYPRESS_VERSION

The version of Cypress to install (via npm). If the env is unset or an empty string, Cypress is not installed.

Example: `CYPRESS_VERSION='12.1.0'`

[Cypress versions](https://www.npmjs.com/package/cypress)

### CHROME_VERSION

The version of Chrome to install. If the env is unset or an empty string, Chrome is not installed. The exact version must be used, no wildcards or shorthands are supported.

Example: `CHROME_VERSION='107.0.5304.121-1'`

[Chrome versions](https://www.ubuntuupdates.org/package/google_chrome/stable/main/base/google-chrome-stable)

### FIREFOX_VERSION

The version of Firefox to install. If the env is unset or an empty string, Firefox is not installed. The exact version must be used, no wildcards or shorthands are supported.

Example: `FIREFOX_VERSION='107.0'`

[Firefox versions](https://download-installer.cdn.mozilla.net/pub/firefox/releases/)

### EDGE_VERSION

The version of Edge to install. If the env is unset or an empty string, Edge is not installed. The exact version must be used, no wildcards or shorthands are supported.

Example: `EDGE_VERSION='100.0.1185.29-1'`

[Edge versions](https://packages.microsoft.com/repos/edge/pool/main/m/microsoft-edge-stable/)

## Usage

The cypress docker factory works by relying on the [`ONBUILD`](https://docs.docker.com/engine/reference/builder/#onbuild) docker instruction to run commands at the container's build time. To make use of the docker factory users will have to create a dockerfile to declare what dependency versions are desired. Docker `args` can be specified in a number of ways, some of which are demonstrated below. For each of these examples we are building the equivalent of the `cypress/browsers` docker image. In each instance since the example is only testing the chrome version, the examples could just install chrome by itself if the other browsers were not used.

### In the Dockerfile

Args can be defined directly in the Dockerfile to specify variables that are available when the container is built.

Dockerfile

```dockerfile
# Args are defined in the Dockerfile before the FROM command.
# Using these args will cause an image to be created with node (default version is 16.18.1), chrome, firefox and edge.
ARG CHROME_VERSION='107.0.5304.121-1'
ARG EDGE_VERSION='100.0.1185.29-1'
ARG FIREFOX_VERSION='107.0'

FROM cypress/factory

COPY . /opt/app
WORKDIR /opt/app
RUN npm install --save-dev cypress
```

Then, in the same directory as the Dockerfile, run the following commands to build the docker container and run Cypress against the chrome browser.

```bash
docker build . -t test
docker run -it test npm run test -b chrome
```

### At build time

Args can be passed to the docker build command with the `--build-arg` flag. Note: any value set via the command line will override the ARG value provided in the Dockerfile.

Dockerfile

```dockerfile
FROM cypress/factory

COPY . /opt/app
WORKDIR /opt/app
RUN npm install --save-dev cypress
```

build commands

```bash
docker build . --build-arg CHROME_VERSION='107.0.5304.121-1' --build-arg EDGE_VERSION='100.0.1185.29-1' --build-arg FIREFOX_VERSION='107.0' -t test

docker run test npm run test -b chrome
```

### In docker-compose.yml

Finally, args can be specified in the docker-compose.yml file.

docker-compose.yml

```yml
version: '3'

services:
  test:
    build:
      context: .
      args:
        CHROME_VERSION: '107.0.5304.121-1'
        EDGE_VERSION: '100.0.1185.29-1'
        FIREFOX_VERSION: '107.0'
    command: npm run test
```

Dockerfile

```dockerfile
FROM cypress/factory

COPY . /opt/app
WORKDIR /opt/app
RUN npm install --save-dev cypress
```

docker commands

```bash
docker compose build test

docker compose run test
```

### Reducing the size of the docker container

As mentioned above we can reduce the size of the docker image by removing browsers we aren't using.

Since this example only uses chrome, removing edge and firefox is as simple as not including a version.

Dockerfile

```dockerfile
# Args are defined in the Dockerfile before the FROM command.
# Using these args will cause an image to be created with node (default version is 16.18.1), chrome, firefox and edge.
ARG CHROME_VERSION='107.0.5304.121-1'

FROM cypress/factory

COPY . /opt/app
WORKDIR /opt/app
RUN npm install --save-dev cypress
```

Then, in the same directory as the Dockerfile, run the following commands to build the docker container and run Cypress against the chrome browser.

```bash
docker build . -t test
docker run -it test npm run test -b chrome
```

The docker image including chrome, edge and firefox weighs in a ~1.93 GB, by removing edge and firefox the image can be reduced to ~1.06 GB.

## Version Testing

Due to the large amount of possible version combinations, we're not able to exhaustively test each combination of versions, nor do we block versions that are incompatible. For example, Cypress 12 removed support for Node.js version 12.0.0. You are still able to generate a container with node 12.0.0 and Cypress 12, but Cypress will fail to run. This is because the factory supports earlier versions of Cypress and must support earlier versions of node.

If you run across a combination that should reasonably work, but doesn't, log an issue and we will take a look at supporting it.

Additionally this docker image and containers generated from it are intended for test use only, and are not intended for hosting services in a production environment.
