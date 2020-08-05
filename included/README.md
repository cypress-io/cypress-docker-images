# cypress/included

[![Docker Pulls](https://img.shields.io/docker/pulls/cypress/included.svg?maxAge=604800)](https://hub.docker.com/r/cypress/included/)

Docker image with operating system and Cypress installed globally.

Name + Tag | Base image
--- | ---
[cypress/included:3.2.0](3.2.0) | `cypress/base:12.1.0`
[cypress/included:3.3.0](3.3.0) | `cypress/base:12.1.0`
[cypress/included:3.3.1](3.3.1) | `cypress/base:12.1.0`
[cypress/included:3.3.2](3.3.2) | `cypress/base:12.1.0`
[cypress/included:3.4.0](3.4.0) | `cypress/browsers:node12.6.0-chrome75`
[cypress/included:3.4.1](3.4.1) | `cypress/browsers:node12.6.0-chrome75`
[cypress/included:3.5.0](3.5.0) | `cypress/browsers:node12.6.0-chrome77`
[cypress/included:3.6.0](3.6.0) | `cypress/browsers:node12.6.0-chrome77`
[cypress/included:3.6.1](3.6.1) | `cypress/browsers:node12.6.0-chrome77`
[cypress/included:3.7.0](3.7.0) | `cypress/browsers:node12.6.0-chrome77`
[cypress/included:3.8.0](3.8.0) | `cypress/browsers:node12.6.0-chrome77`
[cypress/included:3.8.2](3.8.2) | `cypress/browsers:node12.6.0-chrome77`
[cypress/included:3.8.3](3.8.3) | `cypress/browsers:node12.6.0-chrome77`
[cypress/included:4.0.0](4.0.0) | `cypress/browsers:node13.6.0-chrome-80-ff72`
[cypress/included:4.0.1](4.0.1) | `cypress/browsers:node13.6.0-chrome-80-ff72`
[cypress/included:4.0.2](4.0.2) | `cypress/browsers:node13.6.0-chrome-80-ff72`
[cypress/included:4.1.0](4.1.0) | `cypress/browsers:node12.16.1-chrome-80-ff73`
[cypress/included:4.2.0](4.2.0) | `cypress/browsers:node12.13.0-chrome80-ff74`
[cypress/included:4.3.0](4.3.0) | `cypress/browsers:node12.13.0-chrome80-ff74`
[cypress/included:4.4.0](4.4.0) | `cypress/browsers:node12.13.0-chrome80-ff74`
[cypress/included:4.4.1](4.4.1) | `cypress/browsers:node12.13.0-chrome80-ff74`
[cypress/included:4.5.0](4.5.0) | `cypress/browsers:node12.13.0-chrome80-ff74`
[cypress/included:4.6.0](4.6.0) | `cypress/browsers:node12.16.2-chrome81-ff75`
[cypress/included:4.7.0](4.7.0) | `cypress/browsers:node12.16.2-chrome81-ff75`
[cypress/included:4.8.0](4.8.0) | `cypress/browsers:node12.16.2-chrome81-ff75`
[cypress/included:4.9.0](4.9.0) | `cypress/browsers:node12.16.2-chrome81-ff75`
[cypress/included:4.10.0](4.10.0) | `cypress/browsers:node12.14.1-chrome83-ff77`
[cypress/included:4.11.0](4.11.0) | `cypress/browsers:node12.14.1-chrome83-ff77`
[cypress/included:4.12.0](4.12.0) | `cypress/browsers:node12.18.0-chrome83-ff77`
[cypress/included:4.12.1](4.12.1) | `cypress/browsers:node12.18.0-chrome83-ff77`

This image should be enough to run Cypress tests headlessly or in the interactive mode with a single Docker command like this:

```shell
$ docker run -it -v $PWD:/e2e -w /e2e cypress/included:3.3.2
```

## Debug

If you want to see the [Cypress debug logs](https://on.cypress.io/debugging#Print-DEBUG-logs) during the run, pass environment variable `DEBUG`:

```shell
$ docker run -it -v $PWD:/e2e -w /e2e -e DEBUG=cypress:* cypress/included:3.8.1
  cypress:cli:cli cli starts with arguments ["/usr/local/bin/node","/usr/local/bin/cypress","run"] +0ms
  cypress:cli NODE_OPTIONS is not set +0ms
  cypress:cli:cli program parsing arguments +3ms
  ...
```

## Entry

These images have its entry point set to `cypress run`. If you want to run a different command, you need to set `--entrypoint=cypress` and specify arguments AFTER the image name. For example, to print the Cypress information using `cypress info` command

```shell
$ docker run -it --entrypoint=cypress cypress/included:4.2.0 info
Displaying Cypress info...

Detected 2 browsers installed:

1. Chrome
  - Name: chrome
  - Channel: stable
  - Version: 80.0.3987.116
  - Executable: google-chrome

2. Firefox
  - Name: firefox
  - Channel: stable
  - Version: 74.0
  - Executable: firefox

Note: to run these browsers, pass <name>:<channel> to the '--browser' field

Examples:
- cypress run --browser firefox
- cypress run --browser chrome

Learn More: https://on.cypress.io/launching-browsers

Proxy Settings: none detected
Environment Variables:
CYPRESS_CACHE_FOLDER: /root/.cache/Cypress

Application Data: /root/.config/cypress/cy/development
Browser Profiles: /root/.config/cypress/cy/development/browsers
Binary Caches: /root/.cache/Cypress

Cypress Version: 4.2.0
System Platform: linux (Debian - 10.1)
System Memory: 2.09 GB free 285 MB
```

## Browser

If you want to use a different browser (assuming it is installed in the container) use:

```shell
$ docker run -it -v $PWD:/e2e -w /e2e --entrypoint=cypress cypress/included:3.8.1 run --browser chrome

============================================================

  (Run Starting)

  ┌─────────────────────────────────
  │ Cypress:    3.8.1
  │ Browser:    Chrome 77
  │ Specs:      1 found (spec.js)
  └─────────────────────────────────
...
```

For more information, read [Run Cypress with a single Docker command](https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/) and [End-to-End Testing Web Apps: The Painless Way](https://mtlynch.io/painless-web-app-testing/)

## Default user

By default, the included images run as `root` user. You can switch the user to the second user in the image `node` or custom-mapped user, see [examples section](https://github.com/cypress-io/cypress-docker-images#examples). Starting with `cypress/included:3.8.1` we set permissions on the globally installed Cypress and set binary cache variable to allow other users read and execute access. Thus you will be able to run Cypress as non-root user by using `-u node`

```shell
$ docker run -it -v $PWD/src:/test -w /test -u node cypress/included:3.8.1
```

## Building and testing

To build a new image use command from the root of the repo

```shell
$ npm run add:included -- <Cypress version> <cypress/base:image>
# example
$ npm run add:included -- 4.0.2 cypress/browsers:node13.6.0-chrome80-ff72
```

You should also update the `circle.yml` file after creating the new image with

```shell
$ npm run build
```

You can test the new image by creating a new project and running headless tests. For example:

```shell
cd /tmp
mkdir test
cd test
npm init --yes
npm i -D cypress
npx @bahmutov/cly init
rm -rf package-lock.json package.json node_modules
docker run -it -v $PWD:/e2e -w /e2e cypress/included:3.3.2
```

**Tip:** the above commands are in the file [test.sh](test.sh)

The tests should finish successfully using local image. Now push the image to the Docker hub

```shell
docker push cypress/included:3.3.2
```

## GitHub Action

You can quickly run your tests in GitHub Actions using these images, see [cypress-gh-action-included](https://github.com/bahmutov/cypress-gh-action-included) repository.

## GitLab CI

You can use the included images to run Cypress tests on GitLab CI, see how in [cypress-example-included](https://gitlab.com/cypress-io/cypress-example-included) repository.

## Wait-on

If you want to run Cypress after a server has started, we suggest using [wait-on](https://github.com/jeffbski/wait-on#readme) utility. To use it from the `cypress/included` image, you need to disable the default entrypoint and set a new command like this:

```shell
# execute the Cypress container once
docker run --rm \ # remove container after finish
  -v ./e2e:/e2e \ # map current folder to "e2e" folder
  --workdir=/e2e \
  --entrypoint="" \ # remove default entrypoint command
  cypress/included:4.11.0 \
  # wait for the local site to respond
  # then run Cypress tests
  /bin/bash -c 'npx wait-on http://127.0.0.1:3000 && cypress run'
