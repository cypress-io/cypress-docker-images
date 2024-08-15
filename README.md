# Cypress Docker Images [![CircleCI](https://circleci.com/gh/cypress-io/cypress-docker-images/tree/master.svg?style=svg)](https://circleci.com/gh/cypress-io/cypress-docker-images/tree/master)

Cypress Docker images are published to [Cypress on Docker Hub](https://hub.docker.com/u/cypress).

These images provide all of the required dependencies for running Cypress in [Docker](https://docs.docker.com/guides/docker-overview/).

We build four images: click on the image name to see the available tags and versions. We provide multiple tags for various operating systems and specific browser versions. These allow you to target specific combinations you need.

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

[Tags](#tag-selection) for [cypress/browsers](./browsers/) and [cypress/included](./included/) images show which versions of the browsers are loaded into the respective image. (Disregard the browser version tags for current `Linux/arm64` images however.)

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

## Tag Selection

If no tag is specified, for example `cypress/included`, then the tag `latest` is used by default: `cypress/included:latest`. It is however recommended to use a specific image tag to avoid breaking changes when new images are released, especially when they include new major versions of Node.js or Cypress.

Some examples with specific tags including an explanation of the tag meanings are:

- [cypress/base:20.14.0](https://hub.docker.com/layers/cypress/base/20.14.0/images/sha256-ed706ff91fb0642b34422c65d53ee3ad079a03b86c30e7de42a4c15f7d7bb17d)
  Node.js `20.14.0`
- [cypress/browsers:node-20.14.0-chrome-125.0.6422.141-1-ff-126.0.1-edge-125.0.2535.85-1](https://hub.docker.com/layers/cypress/browsers/node-20.14.0-chrome-125.0.6422.141-1-ff-126.0.1-edge-125.0.2535.85-1/images/sha256-a8b9c0a4d9b0bb1ca2ebfe1afbf829f248dd73617438a89e65c0e7d842ac7ec6)
  Node.js `20.14.0`
  Chrome `125.0.6422.141-1`
  Firefox `126.0.1`
  Edge `125.0.2535.85-1`
- [cypress/included:13.11.0](https://hub.docker.com/layers/cypress/included/13.11.0/images/sha256-20ee9650d920abc422b62c039d2b1a11b415f0ac19a84bc17f4da0c7d2f77a2d)
  Cypress `13.11.0`

Once an image with a specific version tag (except `latest`) has been published to [Cypress on Docker Hub](https://hub.docker.com/u/cypress) it is frozen. This prevents accidental changes.

When a new version is published, an image copy with the `latest` tag is also published. This means that the Docker image selected using the `latest` tag (or selected by default if no tag is specified) will also change over time. Specify an explicit version, for example [cypress/base:18.16.0](https://hub.docker.com/layers/cypress/base/18.16.0/images/sha256-d00c441748e2f1b79d4002bddafe6628f9f9f5458a8a3c66697e622600dc5ad5), to access instead a frozen version.

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

See [Tag Selection](#tag-selection) above for advice on selecting a non-default image tag.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

See [LICENSE](LICENSE)
