# cypress/included

[![Docker Pulls](https://img.shields.io/docker/pulls/cypress/included.svg?maxAge=604800)](https://hub.docker.com/r/cypress/included/)

> Docker images with all operating system dependencies, Cypress, and some pre-installed browsers.

## Platforms

`cypress/included` images are available for `Linux/amd64` and `Linux/arm64` platforms.
`Linux/arm64` images do **not** currently contain additional browsers.

## Tags

[cypress/included](https://hub.docker.com/r/cypress/included/tags) images on [Cypress on Docker Hub](https://hub.docker.com/u/cypress) use image tags in the form:

- `cypress-<cypress version>-node-<node version>-chrome-<chrome version>-ff-<firefox version>-edge-<edge version>`
- `<cypress version>`<br>This is a moveable short-form convenience tag, equivalent to the above full tag.
- `latest`

for example:

- `cypress/included:cypress-13.15.1-node-22.11.0-chrome-130.0.6723.69-1-ff-132.0-edge-130.0.2849.56-1`
- `cypress/included:13.15.1`
- `cypress/included:latest`

To avoid unplanned breaking changes, specify a fixed `<cypress version>`, `<node version>` & `<browser version>` combination tag.

The short-form `<cypress version>` convenience tag is linked to the latest image release for the named Cypress version.  The contents of the image may be updated with newer browser versions without notice when they are released.

The `latest` tag is linked to the latest released `cypress/included` image and is updated without notice.

## ENTRYPOINT

`cypress/included` images have their Docker [ENTRYPOINT](https://docs.docker.com/reference/dockerfile/#entrypoint) set to `"cypress" "run"`.

To run a `cypress/included` image using `cypress run`, for instance to run all test specs in the default Electron browser, no additional [docker run](https://docs.docker.com/reference/cli/docker/container/run/) CLI options are needed.

To use [`cypress run` options](https://docs.cypress.io/app/references/command-line#cypress-run), such as `-b chrome`, use the [docker run](https://docs.docker.com/reference/cli/docker/container/run/) command with `--entrypoint cypress` to overwrite the default `ENTRYPOINT` of the `cypress/included` image.

To run `bash` commands interactively in the image, for instance to inspect files, directories or to run Cypress interactively, use the [docker run](https://docs.docker.com/reference/cli/docker/container/run/) command with `--entrypoint bash`.

See below for examples.

## Examples

> [!TIP]
> Remove `cypress` from your project's `package.json` to avoid version mismatch between your project and the `cypress/included` Docker image.

The directory [examples/basic-mini](../examples/basic-mini/) in this repo provides an example project which includes a Cypress E2E test spec and has no Cypress version included in its [package.json](../examples/basic-mini/package.json).

### Docker interactive

In this example we first run the image `cypress/included` as a container, overriding the default command of `cypress run` using `--entrypoint bash` to enter the interactive `bash` shell.

```shell
cd examples/basic-mini         # Use a pre-configured simple Cypress E2E project
docker run -it --rm -v .:/app -w /app --entrypoint bash cypress/included  # Run image as container
```

At the `bash` prompt `:/app#`, we can then enter the following commands:

```shell
ls -al                    # Check the contents of our working directory
npx cypress run -b chrome # Run Cypress test in Chrome
exit
```

### Docker default

In this example we let the Docker image handle running Cypress automatically through the pre-defined `cypress run` command. This runs Cypress with the default Electron browser:

```shell
cd examples/basic-mini         # Use a pre-configured simple Cypress E2E project
docker run -it --rm -v .:/app -w /app cypress/included  # Run image as container and execute cypress run
```

### Browser

To run `cypress/included` using one of the installed browsers (Chrome, Edge or Firefox), we change to `--entrypoint cypress` and add the command `run -b chrome`, for instance, to test against the Chrome browser:

```shell
cd examples/basic-mini
docker run -it --rm -v .:/app -w /app --entrypoint cypress cypress/included run -b chrome
```

### Debug

To see [Cypress debug logs](https://on.cypress.io/troubleshooting#Print-DEBUG-logs) during the run, pass the environment variable setting with `-e DEBUG=cypress:*`:

```shell
cd examples/basic-mini
docker run -it --rm -v .:/app -w /app -e DEBUG=cypress:* cypress/included
```

### Single test spec

To run a single test spec using the Chrome browser:

```shell
cd examples/basic-mini
docker run -it --rm -v .:/app -w /app --entrypoint cypress cypress/included run --spec cypress/e2e/spec.cy.js -b chrome
```

### Info

To run [cypress info](https://docs.cypress.io/app/references/command-line#cypress-info) which prints information about Cypress and the current environment:

```shell
cd examples/basic-mini
docker run -it --rm --entrypoint cypress cypress/included info
```

```text
DevTools listening on ws://127.0.0.1:36243/devtools/browser/eb85524a-6459-41d6-b855-94c10cd2b242
Displaying Cypress info...

Detected 3 browsers installed:

1. Chrome
  - Name: chrome
  - Channel: stable
  - Version: 130.0.6723.69
  - Executable: google-chrome

2. Edge
  - Name: edge
  - Channel: stable
  - Version: 130.0.2849.56
  - Executable: edge

3. Firefox
  - Name: firefox
  - Channel: stable
  - Version: 132.0
  - Executable: firefox

Note: to run these browsers, pass <name>:<channel> to the '--browser' field

Examples:
- cypress run --browser firefox
- cypress run --browser chrome

Learn More: https://on.cypress.io/launching-browsers

Proxy Settings: none detected
Environment Variables:
CYPRESS_CACHE_FOLDER: /root/.cache/Cypress
CYPRESS_FACTORY_DEFAULT_NODE_VERSION: 22.11.0

Application Data: /root/.config/cypress/cy/development
Browser Profiles: /root/.config/cypress/cy/development/browsers
Binary Caches: /root/.cache/Cypress

Cypress Version: 13.15.1 (stable)
System Platform: linux (Debian - 12.7)
System Memory: 5.16 GB free 4.12 GB
```

## User

By default, `cypress/included` images run as `root` user. You can switch to the non-root user `node` in the image or to a custom user.

- [examples/included-as-non-root](../examples/included-as-non-root) describes how to run tests as non-root user `node` using a `cypress/included` image

## Continuous Integration

`cypress/included` images are a convenient tool to run Cypress tests from the command line with all dependencies pre-installed. With their corresponding fixed version of Cypress, they are not primarily intended for use in Continuous Integration (CI) workflows.

[cypress/base](../base/README.md) and [cypress/browsers](../browsers/README.md) images, which are independent of the Cypress version used, are generally better suited for CI use. The required version of Cypress is then dynamically installed into the workflow with one of the [package managers supported](https://docs.cypress.io/app/get-started/install-cypress#Install) by Cypress.

If you do use `cypress/included` in CI, note the special handling recommended in the following sections:

### GitHub Actions

The example workflow [.github/workflows/example-cypress-github-action.yml](../.github/workflows/example-cypress-github-action.yml), job `docker-included`, demonstrates how to use a `cypress/included` image in a GitHub Actions workflow.

If you use a `cypress/included` image in a [GitHub Actions](https://docs.github.com/en/actions) workflow that executes the [Cypress JavaScript GitHub Action `cypress-io/github-action`](https://github.com/cypress-io/github-action), it is recommended to set the environment variable `CYPRESS_INSTALL_BINARY=0` to [skip Cypress binary installation](https://docs.cypress.io/app/references/advanced-installation#Skipping-installation). This avoids unnecessary caching attempts for the Cypress binary. `cypress/included` images already include the cached Cypress binary and additional caching attempts with a non-root user can lead to non-fatal error messages. The example workflow, mentioned above, shows how to set the environment variable `CYPRESS_INSTALL_BINARY`.

### GitLab Pipelines

If you use a `cypress/included` image in a [GitLab CI/CD pipeline](https://docs.gitlab.com/ee/ci/pipelines/) you need to [override the default entrypoint](https://docs.gitlab.com/ee/ci/docker/using_docker_images.html#override-the-entrypoint-of-an-image) with an empty value, otherwise the pipeline will fail.

For example:

```yml
  image:
    name: cypress/included
    entrypoint: [""]
```
