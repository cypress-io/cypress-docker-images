# cypress/included

[![Docker Pulls](https://img.shields.io/docker/pulls/cypress/included.svg?maxAge=604800)](https://hub.docker.com/r/cypress/included/)

> Docker images with all operating system dependencies, Cypress, and some pre-installed browsers.

## Platforms

`cypress/included` images are available for `Linux/amd64` and `Linux/arm64` platforms.
`Linux/arm64` images do **not** currently contain additional browsers.

## Tags

[cypress/included](https://hub.docker.com/r/cypress/included/tags) images on [Cypress on Docker Hub](https://hub.docker.com/u/cypress) use image tags in the form:

- `<cypress version>`-node-`<node version>`-chrome-`<chrome version>`-ff-`<firefox version>`-edge-`<edge version>`-
- `<cypress version>`<br>This is a short-form convenience tag, equivalent to the above full tag.
- `latest`

for example:

- `cypress/included:cypress-13.11.0-node-20.14.0-chrome-125.0.6422.141-1-ff-126.0.1-edge-125.0.2535.85-1`
- `cypress/included:13.11.0`
- `cypress/included:latest`

To avoid unplanned breaking changes, specify a fixed `<cypress version>`, `<node version>` & `<browser version>` combination tag or use the short-form `<cypress version>` tag, not the `latest` tag. The `latest` tag is linked to the latest released `cypress/included` image and is updated without notice.

## ENTRYPOINT

When running a container from a `cypress/included` image, `cypress run` is executed, as defined by the [ENTRYPOINT](https://docs.docker.com/reference/dockerfile/#entrypoint) parameter of the image.

## Usage

This image should be enough to run Cypress tests headlessly or in the interactive mode with a single Docker command like this:

```shell
$ docker run -it -v .:/e2e -w /e2e cypress/included:13.10.0
```

## Debug

If you want to see the [Cypress debug logs](https://on.cypress.io/troubleshooting#Print-DEBUG-logs) during the run, pass the environment variable setting `DEBUG=cypress:*`:

```text
$ docker run -it -v .:/e2e -w /e2e -e DEBUG=cypress:* cypress/included:13.10.0
  cypress:cli:cli cli starts with arguments ["/usr/local/bin/node","/usr/local/bin/cypress","run"] +0ms
  cypress:cli NODE_OPTIONS is not set +0ms
  cypress:cli:cli program parsing arguments +3ms
  ...
```

## Arguments

These images have their entry point set to `cypress run` without any additional arguments. You can specify additional Cypress CLI arguments after the image name. For example to print the Help menu for the `cypress run` command:

```shell
$ docker run -it --entrypoint=cypress cypress/included:13.10.0 run --help
```

To run a single spec using Chrome browser:

```shell
$ docker run -it -v .:/e2e -w /e2e --entrypoint=cypress cypress/included:13.10.0 run --spec cypress/e2e/spec.cy.js --browser chrome
```

## Entry

These images have their entry point set to `cypress run`. If you want to run a different command, you need to set `--entrypoint=cypress` and specify arguments AFTER the image name. For example, to print the Cypress information using `cypress info` command

```text
$ docker run -it --entrypoint=cypress cypress/included:13.10.0 info

DevTools listening on ws://127.0.0.1:41043/devtools/browser/7da6e086-a4eb-4408-acab-e22f3cb6c076
Displaying Cypress info...

Detected 3 browsers installed:

1. Chrome
  - Name: chrome
  - Channel: stable
  - Version: 125.0.6422.60
  - Executable: google-chrome

2. Edge
  - Name: edge
  - Channel: stable
  - Version: 125.0.2535.51
  - Executable: edge

3. Firefox
  - Name: firefox
  - Channel: stable
  - Version: 126.0
  - Executable: firefox

Note: to run these browsers, pass <name>:<channel> to the '--browser' field

Examples:
- cypress run --browser firefox
- cypress run --browser edge

Learn More: https://on.cypress.io/launching-browsers

Proxy Settings: none detected
Environment Variables:
CYPRESS_CACHE_FOLDER: /root/.cache/Cypress
CYPRESS_FACTORY_DEFAULT_NODE_VERSION: 20.13.1

Application Data: /root/.config/cypress/cy/development
Browser Profiles: /root/.config/cypress/cy/development/browsers
Binary Caches: /root/.cache/Cypress

Cypress Version: 13.10.0 (stable)
System Platform: linux (Debian - 11.9)
System Memory: 5.16 GB free 4.09 GB
```

### Entry with arguments

If you want to provide Cypress command line arguments, specify the entry point and the arguments. For example to run tests with recording and parallel mode using custom build ID "abc123" we can use:

```shell
$ docker run -it -v .:/e2e -w /e2e --entrypoint=cypress cypress/included:13.10.0 run --record --parallel --ci-build-id abc123
```

## Keep the container

Every time you run `docker run` you spawn a new container. That container then stops after the tests finish, but there is nothing Cypress can do about it - it is the Docker command `docker run ...` that controls this behavior.

If you are running a lot of tests again and again, you might start the container once using Bash as the entrypoint, instead of the default `cypress` command. Then you can execute the `cypress run` or any other commands, while still in the same container:

```text
$ docker run -it -v .:/e2e -w /e2e --entrypoint=/bin/bash cypress/included:13.10.0
# we are inside the container
# let's run the tests
root@814ed01841fe:/e2e# cypress run
....
# run the tests again
root@814ed01841fe:/e2e# cypress run
```

## Browser

If you want to use a different browser (assuming it is installed in the container) use:

```text
$ docker run -it -v .:/e2e -w /e2e --entrypoint=cypress cypress/included:13.10.0 run --browser chrome

DevTools listening on ws://127.0.0.1:45315/devtools/browser/0c510bb9-b365-49e7-8a99-67f3c69e1ab9

====================================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:        13.10.0                                                                        │
  │ Browser:        Chrome 125 (headless)                                                          │
  │ Node Version:   v20.13.1 (/usr/local/bin/node)                                                 │
  │ Specs:          1 found (spec.cy.js)                                                           │
  │ Searched:       cypress**/*.cy.{js,jsx,ts,tsx}                                                 │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘

  ...
```

## Default user

By default, `cypress/included` images run as `root` user. You can switch to the non-root user `node` in the image or to a custom-mapped user, see the [Alternate users](#alternate-users) section below.

## GitHub Action

You can quickly run your tests in GitHub Actions using these images, see [GitHub Action example](https://github.com/cypress-io/github-action#docker-image) repository.

## Wait-on

If you want to run Cypress after a server has started, we suggest using [wait-on](https://github.com/jeffbski/wait-on#readme) utility. To use it from the `cypress/included` image, you need to disable the default entrypoint and set a new command like this:

```shell
# execute the Cypress container once
docker run --rm  # remove container after finish
  -v ./e2e:/e2e  # map current folder to "e2e" folder
  --workdir=/e2e   --entrypoint=""  # remove default entrypoint command
  cypress/included:13.10.0   # wait for the local site to respond
  # then run Cypress tests
  /bin/bash -c 'npx wait-on http://127.0.0.1:3000 && cypress run'
```

## Restrict CPU

If you want to simulate a slow container, run the Docker container with the `--cpus` parameter, for example, let's debug possible browser detection problems when the CPU is slow:

```shell
docker run -it --cpus=0.2 -e DEBUG=cypress:launcher:* --entrypoint=cypress cypress/included:13.10.0 info
```

## Alternate users

- [examples/included-as-non-root](../examples/included-as-non-root) describes how to run tests as non-root user `node` using a `cypress/included` image

The following example is built on a legacy version of Cypress and has not yet been updated to demonstrate current Cypress versions:

- [examples/included-as-non-root-mapped](../examples/included-as-non-root-mapped) shows how to build a Docker image on top of `cypress/included` that runs with a non-root user that matches the id of the user on the host machine. This way, the permissions on any files created during the test run match the user's permissions on the host machine. This example is specific to using `cypress/included` images under [Docker Desktop on Mac](https://docs.docker.com/desktop/install/mac-install/).

## Using plugins

The following example is built on `cypress/included:3.8.0` and has not yet been updated to demonstrate current Cypress versions:

- [examples/included-with-plugins](../examples/included-with-plugins) shows how to use locally installed [Cypress plugins](https://on.cypress.io/plugins) while running `cypress/included` image.
