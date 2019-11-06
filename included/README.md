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

This image should be enough to run Cypress tests headlessly or in the interactive mode with a single Docker command like this:

```shell
$ docker run -it -v $PWD:/e2e -w /e2e cypress/included:3.3.2
```

For more information, read [Run Cypress with a single Docker command](https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/) and [End-to-End Testing Web Apps: The Painless Way](https://mtlynch.io/painless-web-app-testing/)

## Building and testing

To build a new image, clone an existing folder, update version strings and build the Docker image locally. Then test it by creating a new project and running headless tests. For example:

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
