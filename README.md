# Cypress Docker Images [![CircleCI](https://circleci.com/gh/cypress-io/cypress-docker-images/tree/master.svg?style=svg)](https://circleci.com/gh/cypress-io/cypress-docker-images/tree/master)

Cypress Docker images are published to [Cypress on Docker Hub](https://hub.docker.com/u/cypress).

These images provide all of the required dependencies for running Cypress in [Docker](https://docs.docker.com/guides/docker-overview/).

We build four images: click on the image name to see the available tags with versions, and refer to the [Tags](#tags) section below. These allow you to target specific combinations you need.

| Image Name                                                     | Description                                                                        | Monthly pulls                                                                                                                         |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [cypress/factory](https://hub.docker.com/r/cypress/factory/)   | A base image template which can be used with ARGs to create a custom docker image. | [![Docker Pulls](https://img.shields.io/docker/pulls/cypress/factory.svg?maxAge=604800)](https://hub.docker.com/r/cypress/factory/)   |
| [cypress/base](https://hub.docker.com/r/cypress/base/)         | All operating system dependencies, no Cypress, and no browsers.                    | [![Docker Pulls](https://img.shields.io/docker/pulls/cypress/base.svg?maxAge=604800)](https://hub.docker.com/r/cypress/base/)         |
| [cypress/browsers](https://hub.docker.com/r/cypress/browsers/) | All operating system dependencies, no Cypress, and some browsers.                  | [![Docker Pulls](https://img.shields.io/docker/pulls/cypress/browsers.svg?maxAge=604800)](https://hub.docker.com/r/cypress/browsers/) |
| [cypress/included](https://hub.docker.com/r/cypress/included/) | All operating system dependencies, Cypress, and some browsers installed globally.  | [![Docker Pulls](https://img.shields.io/docker/pulls/cypress/included.svg?maxAge=604800)](https://hub.docker.com/r/cypress/included/) |

## Platforms

Cypress Docker images are Linux based, using the Docker image [debian:12-slim](https://hub.docker.com/_/debian) as the default base image. Each of the above listed Cypress Docker images is published with [multi-architecture](https://docs.docker.com/contribute/style/terminology/#multi-architecture--multi-arch) support for `Linux/amd64` and `Linux/arm64` platforms.

Cypress Docker images can be run as containers on Continuous Integration (CI) systems which support Docker. Cypress Docker images can also be run locally under [Docker Desktop](https://docs.docker.com/desktop/) for Mac, Linux or Windows environments.

In the case of Windows environments, see [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/) and Cypress documentation [Windows Subsystem for Linux](https://on.cypress.io/guides/references/advanced-installation#Windows-Subsystem-for-Linux) for additional information regarding Microsoft's `WSL2` and `WSLg` subsystems. The documentation and scripts in this repository assume that Docker Desktop for Windows runs in a virtual Linux environment.

## Browsers

Cypress Docker images [cypress/browsers](./browsers/) include browsers for the `Linux/amd64` platform. Availability is pending for the `Linux/arm64` platform.

| Browser                    |   `Linux/amd64`    | `Linux/arm64`                                                                                                                    |
| -------------------------- | :----------------: | :------------------------------------------------------------------------------------------------------------------------------- |
| [Google Chrome][Chrome]    | :white_check_mark: | see [#1188](https://github.com/cypress-io/cypress-docker-images/issues/1188)                                                     |
| [Mozilla Firefox][Firefox] | :white_check_mark: | see [#1190](https://github.com/cypress-io/cypress-docker-images/issues/1190) and [examples/firefox-esr](./examples/firefox-esr/) |
| [Microsoft Edge][Edge]     | :white_check_mark: | see [#1189](https://github.com/cypress-io/cypress-docker-images/issues/1189)                                                     |

On POSIX-based systems, or with [Git for Windows](https://gitforwindows.org/) at a Git Bash prompt, execute `uname -m` to display your system's architecture. ([x86_64](https://en.wikipedia.org/wiki/X86-64) is equivalent to `amd64`.)

[cypress/included](./included/) images, which are built on top of [cypress/browsers](./browsers/), contain the same set of browsers.

[Tags](#tags) for [cypress/browsers](./browsers/) and [cypress/included](./included/) images show which versions of the browsers are loaded into the respective image. (Disregard the browser version tags for current `Linux/arm64` images however.)

Building a custom image with [cypress/factory](./factory/) allows selection of individual browsers from the above list.

<!-- browser links -->

[Chrome]: https://developer.chrome.com/
[Firefox]: https://www.mozilla.org/firefox
[Edge]: https://developer.microsoft.com/microsoft-edge/
[Chromium]: https://www.chromium.org/Home/
[Firefox Channel Choice]: https://support.mozilla.org/en-US/kb/choosing-firefox-update-channel

### Debian packages

[Debian][Debian packages] provides two Cypress-compatible browsers as packages covering both `amd64` and `arm64` architectures.
These can be used to complement the browsers that are configurable through the `cypress/factory` build process:

- See the directory [examples/chromium](./examples/chromium/) to add the current version of Chromium for Debian to Cypress Docker images.
  The [Debian Chromium Wiki][Debian-Chromium-Wiki] describes the [Chromium][Chromium] browser distribution details.
  Chromium is not currently included in the `cypress/factory` build process.
  See [#1191](https://github.com/cypress-io/cypress-docker-images/issues/1191) for progress of this integration.

- See the directory [examples/firefox-esr](./examples/firefox-esr/) to add Firefox ESR for Debian to Cypress Docker images.
  The [Debian Firefox Wiki][Debian-Firefox-Wiki] describes the [Firefox][Firefox] browser distribution details from the [Extended Support Release][Firefox Channel Choice] channel.
  This differs from the `cypress/factory` build process which uses Firefox `amd64` versions from the [Rapid Release][Firefox Channel Choice] channel.
  See [#1190](https://github.com/cypress-io/cypress-docker-images/issues/1190) for availability of Firefox `arm64` [Rapid Release][Firefox Channel Choice] versions.

<!-- Debian links -->

[Debian packages]: https://www.debian.org/distrib/packages
[Debian-Chromium-Wiki]: https://wiki.debian.org/Chromium
[Debian-Firefox-Wiki]: https://wiki.debian.org/Firefox

## Tags

To select an image, use the `[REPOSITORY[:TAG]]` format. `REPOSITORY` is one of `cypress/factory`, `cypress/base`, `cypress/browsers` or `cypress/included`. If `TAG` is omitted, it defaults to `latest`.

For each of the `REPOSITORY` image types, see the `Tags` section of each `README` document for more detail.

| Image Type README                                    | Example Tag |
| ---------------------------------------------------- | ----------- |
| [cypress/factory README](./factory/README.md#tags)   | `5.1.0`     |
| [cypress/base README](./base/README.md#tags)         | `22.11.0`   |
| [cypress/browsers README](./browsers/README.md#tags) | `22.11.0`   |
| [cypress/included README](./included/README.md#tags) | `13.16.0`   |

Images with a specific version tag for `cypress/factory` and `cypress/base` (for example: `cypress/factory:5.1.0` and `cypress/base:22.11.0`) are frozen once they have been published. The same is true for images linked to full browser version tags for `cypress/browsers` and `cypress/included` (for example: `cypress/browsers:node-22.11.0-chrome-131.0.6778.69-1-ff-132.0.2-edge-131.0.2903.51-1` and `cypress/included:cypress-13.16.0-node-22.11.0-chrome-131.0.6778.69-1-ff-132.0.2-edge-131.0.2903.51-1`).

`cypress/browsers` and `cypress/included` images are also offered with short-form convenience tags that do not include browser version details (example: `cypress/browsers:22.11.0` and `cypress/included:13.16.0`). The tags that these images refer to can change without notice if browser updates are made.

Similarly, the convenience tag `latest`, for each of the image types, changes without notice.

To avoid breaking changes when new images are released, use a corresponding frozen image tag rather than a convenience tag.

## Usage

📍Cypress Docker images are offered as a convenience measure. The goal is to offer Node.js, Browser and Cypress versions to streamline running tests in CI or other non-public, sandboxed environments.

Some preparations and optimizations are not included. For example, given the near infinite permutations, images are not monitored for security vulnerabilities. Additionally, once images are published they are considered immutable and cannot be patched. That means (hypothetically) older images could become more vulnerable over time.

This means they should **not** be used for production deployment and security scans should be performed as-needed by users of these images.

## Docker Hub

All of the images and tags are published to [Cypress on Docker Hub](https://hub.docker.com/u/cypress) under:

- [https://hub.docker.com/r/cypress/factory](https://hub.docker.com/r/cypress/factory)
- [https://hub.docker.com/r/cypress/base](https://hub.docker.com/r/cypress/base)
- [https://hub.docker.com/r/cypress/browsers](https://hub.docker.com/r/cypress/browsers)
- [https://hub.docker.com/r/cypress/included](https://hub.docker.com/r/cypress/included)

## Cypress/Factory

Don't see the exact combination of Cypress, Node.js and browser versions you need for your test environment? Checkout our [cypress/factory](factory). You can use it to generate a custom image to fit your needs.

## Examples

- Check out the documentation for each type of Cypress Docker image to read about example usage: [cypress/base](./base/README.md), [cypress/browsers](./browsers/README.md) and [cypress/included](./included/README.md) can all be used directly without change. Each of the Docker images can be used to build other images. [cypress/factory](./factory/README.md) is the preferred image to generate custom images.

- Refer to [CI Docker examples](https://on.cypress.io/guides/continuous-integration/introduction#CI-Docker-examples) for links to examples of using Cypress Docker images with different Continuous Integration (CI) providers. See also the example workflow [.github/workflows/example-cypress-github-action.yml](./.github/workflows/example-cypress-github-action.yml) in this repository for CI usage with [cypress&#8209;io/github&#8209;action](https://github.com/cypress-io/github-action) running under the CI provider [GitHub Actions](https://docs.github.com/en/actions).

## User

By default, Docker containers run as `root` user. [cypress/base](./base/README.md), [cypress/browsers](./browsers/README.md) and [cypress/included](./included/README.md) images provide the additional non-root user `node`.

If you run a Cypress Docker image locally as container with a non-root user, refer to the [Docker documentation](https://docs.docker.com/), such as [Docker Desktop FAQs](https://docs.docker.com/desktop/), for information on file-sharing between your host system and Docker. File-sharing details differ depending on the host operating system running Docker.

If you specify a Cypress Docker image in a [GitHub Actions job](https://docs.github.com/en/actions/using-jobs/running-jobs-in-a-container) `container` workflow section, add `options: --user 1001` to the workflow to avoid permissions issues.

## Debug logs

To enable all Cypress debug logs when running Cypress in a Docker container, set the environment variable `DEBUG` to the value `cypress:*`. To filter the debug logs read [Log sources](https://on.cypress.io/troubleshooting#Log-sources) for alternate values of `DEBUG`.

- For `docker run` in a command line, refer to [docker run: set environment variables](https://docs.docker.com/reference/cli/docker/container/run/#env) for options to pass environment variables to a Docker container.
- In a Continuous Integration (CI) workflow using a Cypress Docker image, refer to your CI documentation for information on setting environment variables.

## Known problems

## Firefox not found

### Problem

When running in [GitHub Actions](https://docs.github.com/en/actions) using a `cypress/browsers` or `cypress/included` image and testing against the Mozilla Firefox browser with the default `root` user, Cypress may fail to detect an installed Firefox browser. Instead Cypress shows the following error message:

> Browser: firefox was not found on your system or is not supported by Cypress.
> Can't run because you've entered an invalid browser name.

The [GitHub Actions Runner](https://github.com/actions/runner) creates the `/github/home` directory with non-root ownership `1001` (`runner`) and sets the environment variable `HOME` to point to this directory. Firefox will not run with these settings. If the command `firefox --version` is executed, Firefox explains the restriction:

> Running Firefox as root in a regular user's session is not supported. ($HOME is /github/home which is owned by uid 1001.)

See [Cypress issue #27121](https://github.com/cypress-io/cypress/issues/27121).

### Resolution

To allow Firefox to run in GitHub Actions in a Docker container, add `options: --user 1001` to the workflow to match GitHub Actions' `runner` user.

```yml
container:
  image: cypress/browsers
  options: --user 1001
```

See [Tags](#tags) section above for advice on selecting a non-default image tag.

## EACCES permission denied binary_state.json

### Problem

If a custom Docker image is built from a `cypress/base` or `cypress/browsers` Cypress Docker image, using a `Dockerfile` to install the Cypress binary (for instance with `npx cypress install`), and the custom image is then run as a container with a non-root user, Cypress will fail to run with an error message:

> Error: EACCES: permission denied, open '/root/.cache/Cypress/`<Cypress version>`/binary_state.json'

This is due to an open Cypress issue [#30684](https://github.com/cypress-io/cypress/issues/30684) where Cypress fails to verify the installed Cypress binary if it does not have write access to the Cypress binary directory.

### Workaround

To workaround this issue, either make the Cypress binary directory writable, or skip the Cypress binary verification.

To make the complete Cypress binary directory writable, add the following to the `Dockerfile` after the step to install the Cypress binary:

```Dockerfile
RUN chmod -R 777 /root/.cache/Cypress
```

To skip Cypress binary verification using the environment variable `CYPRESS_SKIP_VERIFY`, described in the Cypress documentation [Advanced Installation](https://docs.cypress.io/app/references/advanced-installation#Environment-variables), either add the following to the `Dockerfile`:

```Dockerfile
ENV CYPRESS_SKIP_VERIFY=true
```

or pass the environment variable as an additional CLI option `--env CYPRESS_SKIP_VERIFY=true` to the [docker run](https://docs.docker.com/reference/cli/docker/container/run/) command.

## Fontconfig error: No writable cache directories

### Problem

If a Cypress Docker image is run with a non-root user other than `node` (`1000`) then Cypress may be unable to write into the Linux `$HOME` directory and may fail. The error message contains the text:

```text
Fontconfig error: No writable cache directories
The Test Runner unexpectedly exited via a exit event with signal SIGTRAP
```

### Workaround

Build a custom Docker image and add the following instructions to the end of the `Dockerfile` to allow the `$HOME` directory for the non-root user `node` to be used and to allow Cypress write access to the necessary cache directories:

```Dockerfile
ENV HOME=/home/node
RUN chmod -R 777 $HOME /root/.cache/Cypress
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

See [LICENSE](LICENSE)
