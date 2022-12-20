# Cypress/Factory

Cypress/Factory is a docker container that can be used with args to generate a docker container with a specific version of:

* node
* yarn
* chrome
* firefox
* edge
* cypress

## Benefits

* Freedom to choose which versions to test against.
* No need to wait on a release to test the latest version of a browser
* Smaller docker sizes especially when not including unused browsers
* Easily test multiple browser versions

## Usage

The cypress docker factory works by relying on the ONBUILD docker command to run commands at build time of the the consuming container. Args can be specified in a number of ways, some of which are demonstrated below.

### In the dockerfile

Args can be defined directly in the dockerfile.

dockerfile

```dockerfile
# Args are defined in the dockerfile before the FROM command.
# Using these args will cause an image to be created with node, chrome, firefox and edge.
ARG CHROME_VERSION='107.0.5304.121-1'
ARG EDGE_VERSION='110.0.1556.0-1'
ARG FIREFOX_VERSION='107.0'

FROM cypress/factory

COPY . /opt/app
WORKDIR /opt/app
RUN npm install --save-dev cypress
```

build commands

```bash
docker build . -t test
docker run -it test npm run test -b chrome
```

### At build time

Args can be passed to the docker build command.

dockerfile

```dockerfile
FROM cypress/factory

COPY . /opt/app
WORKDIR /opt/app
RUN npm install --save-dev cypress
```

build commands

```bash
docker build . --build-arg CHROME_VERSION='107.0.5304.121-1' --build-arg EDGE_VERSION='110.0.1556.0-1' --build-arg FIREFOX_VERSION='107.0' -t test

docker run test npm run test -b chrome
```

### In docker-compose.yml

Finally, args can be specified in the docker-compose.yml file.

docker-compose.yml

```yml
version: '3'

services:
  test:
    args:
      CHROME_VERSION: '107.0.5304.121-1'
      EDGE_VERSION: '110.0.1556.0-1'
      FIREFOX_VERSION: '107.0'
    build:
      context: .
    command: npm run test
```

dockerfile

```dockerfile
FROM cypress/factory

COPY . /opt/app
WORKDIR /opt/app
RUN npm install --save-dev cypress
```

docker commands

```bash
docker-compose build test

docker-compose run test
```

## API

The following args can be set to define what versions the cypress factory docker includes in it's final build.

### NODE_VERSION

The version of Node to install in the docker container. If not specified, the default version of Node is installed. Node is required.

Example: `NODE_VERSION='16.18.1'`

[Node Versions](https://nodejs.org/en/download/releases)

### YARN_VERSION

The version of yarn to install (via npm). If not specified, Yarn is not installed.

Example: `YARN_VERSION='1.22.19'`

[Yarn versions](https://www.npmjs.com/package/yarn)

### CYPRESS_VERSION

The version of Cypress to install (via npm). If not specified, Cypress is not installed.

Example: `CYPRESS_VERSION='12.1.0'`

[Cypress versions](https://www.npmjs.com/package/cypress)

### CHROME_VERSION

The version of Chrome to install (via npm). If not specified, Chrome is not installed.

Example: `CHROME_VERSION='107.0.5304.121-1'`

[Chrome versions](https://www.ubuntuupdates.org/package/google_chrome/stable/main/base/google-chrome-stable)

### FIREFOX_VERSION

The version of Firefox to install (via npm). If not specified, Firefox is not installed.

Example: `FIREFOX_VERSION='107.0'`

[Firefox versions](https://download-installer.cdn.mozilla.net/pub/firefox/releases/)

### EDGE_VERSION

The version of Edge to install (via npm). If not specified, Edge is not installed.

Example: `EDGE_VERSION='110.0.1556.0-1'`

[Edge versions](https://packages.microsoft.com/repos/edge/pool/main/m/microsoft-edge-stable/)
