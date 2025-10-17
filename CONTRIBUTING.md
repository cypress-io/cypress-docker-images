# Contributing to Cypress

Thanks for taking the time to contribute! :smile:

## Code of Conduct

All contributors are expected to abide by our [Code of Conduct](https://github.com/cypress-io/cypress/blob/develop/CODE_OF_CONDUCT.md).

## Development

This document describes the process to contribute Cypress Docker images for release to the public Cypress repositories on

- [Docker Hub](https://hub.docker.com/u/cypress)
- [Amazon ECR (Elastic Container Registry) Public Gallery](https://gallery.ecr.aws/cypress-io)

Releases to these public repositories are reserved for configurations that cover general needs, not special configurations.

> [!TIP]
> To generate customized Cypress Docker images for private organizational use please refer to the [cypress/factory](./factory/README.md) document.

### Replacing existing images

⚠️ As a rule, unless there are extraordinary circumstances, we do NOT replace the existing Docker images. Replacing the images already used by people is dangerous, since it replaces the versions of tools without warning. We have such failed experience once, and do not want to repeat this mistake. Thus instead of replacing an existing image, in 99% of the cases we publish a new Docker image.

### Building locally

We use `docker compose` to build the `factory` image locally.

```bash
cd factory
docker compose build factory
```

With the `factory` image built, you can now build other images

```bash
# This builds the 'included' image specified in the docker-compose file.
docker compose build included

# This builds all images specified in the docker-compose file.
docker compose build
```

Or you can then run tests in the `test-project`

```bash
cd test-project

# set the environment variables from factory/.env in your terminal.
set -a && . ../.env && set +a

# run the test in an image built on top of the factory.
docker compose run --build --rm test-factory-all-included
```

### Publishing images

#### Automatic

##### Primary versions

The [factory/.env](./factory/.env) in the `master` branch should be maintained with the latest stable and supported versions. An exception is the `FACTORY_DEFAULT_NODE_VERSION` which should be set to the [Node.js Active LTS](https://nodejs.org/en/about/previous-releases) version, not the "Current" version.

To publish a new image for `factory`, `base`, `browsers`, or `included`, open a PR with the desired version(s) updated in the [factory/.env](./factory/.env) file. If you change installation scripts or any of the following environment variables in [factory/.env](./factory/.env), then you should also bump the `FACTORY_VERSION` in the same file and make a note of the change in the factory [CHANGELOG](./factory/CHANGELOG.md):

- `BASE_IMAGE`
- `FACTORY_DEFAULT_NODE_VERSION`
- `YARN_VERSION`

You should not change the `FACTORY_VERSION` or make an entry into the factory [CHANGELOG](./factory/CHANGELOG.md) if you are only changing browser versions, geckodriver version or the Cypress version.

Once the PR is merged into the `master` branch, the corresponding images will be pushed to [Docker Hub](https://hub.docker.com/u/cypress) and to the [Amazon ECR (Elastic Container Registry) Public Gallery](https://gallery.ecr.aws/cypress-io) via an automated script run through [CircleCI](circle.yml). Please check that the CI jobs pass after merge. Any CI failure can cause the release process to be interrupted.

##### Alternate versions

> Note: Assistance from a member of the Cypress org is required for this process

An example of an alternate version of a Cypress Docker image would be one based on a [Node.js release](https://nodejs.org/en/about/previous-releases) in the category "Maintenance LTS" or "Current". Primary versions of Cypress Docker images are always based on the latest Node.js version from the "Active LTS" category.

If you need to release an alternate version that does not qualify to be a primary version, do not modify any files in the `master` branch. Instead, carry out the following steps to work in a separate branch.

1. Create a feature branch in the form `<cypress-version>-node-<node.js version>-publish`, for example `15.4.0-node-25.0.0-publish`, branched from the `master` branch. If you are not a member of the Cypress org, and you are working in a fork of the repo, make a request via a new issue to create a feature branch in the parent repo.
2. Create a similarly named working branch, for example, `15.4.0-node-25.0.0-work`, also branched from the `master` branch.
3. Now modify the three files as follows in your working branch. Pay attention to comments in the files affected for additional details of the changes necessary.
4. Modify [factory/.env](./factory/.env) with the desired versions. Do not modify the `FACTORY_VERSION`. No new `cypress/factory` image should be published with this process.
5. Modify [factory/docker-compose.yml](./factory/docker-compose.yml) to comment out the creation of `latest` tags. Comment out the `cypress/included` `INCLUDED_IMAGE_SHORT_TAG` to also prevent this tag from being created. This step is essential to avoid the related tags of any existing released images being moved to point to non-primary images.
6. Modify [circle.yml](circle.yml) to push releases from the feature branch.
7. Open a PR which commits the changes from your working branch to the publish feature branch. Do **not** target the `master` branch with the PR.
8. After PR merge, check Cypress on [Docker Hub](https://hub.docker.com/u/cypress) for the presence of the associated new image(s).

#### Manual

> Note: This requires being a member of the Cypress org

`base-internal` and `browsers-internal` images are not automatically published after changes are merged. They require manual publishing to Docker Hub. To manual publish:

1. Generate the corresponding files within the `base-internal` and/or `browsers-internal` directories that you want to generate the image from.
2. Log into Docker Desktop using `cypressdockerpublisher` credentials.
3. Follow the instructions to build the image from within the generated `Dockerfile` within the appropriate directory in order to build the image locally.
4. Select 'Push to Hub' on the generate image within Docker Desktop.
   - If pushing the image fails with `(HTTP code 400) unexpected - invalid tag format`, you can try pushing the image through the CLI, `docker push <NAME:TAG>`
5. Check Docker Hub to ensure the new image is published and test that it works.

![](https://github.com/cypress-io/cypress/assets/1271364/85507060-acc3-48b5-bc16-4160c4620e1e)

#### To forward X11 from inside a Docker container to a host running macOS

If you need to test that the image works with Cypress, you can follow these instructions if on a macOS machine, which might prove helpful when debugging image dependencies:

1. Install XQuartz: https://www.xquartz.org/
2. Launch XQuartz. Under the XQuartz menu, select Settings
3. Go to the security tab and ensure "Allow connections from network clients" is checked.
4. From the XQuarts terminal, run `xhost + ${hostname}` to allow connections to the macOS host
5. From the XQuarts terminal, set up a `HOSTNAME` env var `export HOSTNAME="host.docker.internal:0"`
6. From the XQuarts terminal, run your Docker image like such:

```bash
docker run --rm -it -e DISPLAY="host.docker.internal:0" -v /tmp/.X11-unix:/tmp/.X11-unix --entrypoint bash <YOUR_IMAGE_TAG>
```

When executing `npx cypress open` from the Docker container, the display should now be visible!

## Releasing a new factory version

To release a new [factory](./factory/README.md), open a PR with the desired changes to the [factory.Dockerfile](./factory/factory.Dockerfile) or [installScripts](./factory/installScripts/). After making changes, note the changes in the factory [CHANGELOG](./factory/CHANGELOG.md) and bump the `FACTORY_VERSION` in the [.env](./factory/.env) file to trigger a new release.

## Minimize image sizes

The `BASE_IMAGE` defined in [factory/.env](./factory/.env) uses a [Debian Docker image](https://hub.docker.com/_/debian). To keep the image size of the generated Cypress Docker images to a minimum, choose the `slim` variant when other versions of Debian are used, for instance when [Debian releases](https://www.debian.org/releases/) a new major version.

To see the size of an image, you can use the command [`docker images`](https://docs.docker.com/engine/reference/commandline/images/), for instance with:

```shell
docker images --format "table {{.Repository}} {{.Tag}} {{.Size}}"
```

A snapshot of sizes shows:

| REPOSITORY       | TAG                                                               | SIZE   |
| ---------------- | ----------------------------------------------------------------- | ------ |
| cypress/factory  | 4.0.0                                                             | 506MB  |
| cypress/base     | 20.13.1                                                           | 640MB  |
| cypress/browsers | node-20.13.1-chrome-125.0.6422.60-1-ff-126.0-edge-125.0.2535.51-1 | 2.14GB |
| cypress/included | 13.10.0                                                           | 2.86GB |

### Clean up `apt-get` artifacts

Calling `apt-get` creates artifacts that are not necessary to the image, and these artifacts bloat the image size and all images that inherit from it.

To avoid bloating the Docker layers with extraneous files, after every `RUN` call with `apt-get`, add these cleanup commands within the same `RUN`:

```bash
rm -rf /usr/share/doc && \
rm -rf /usr/share/man && \
rm -rf /var/lib/apt/lists/*
```

Note that due to the use of `debian:<suite>-slim` the directories `/usr/share/doc` and `/usr/share/man` already have minimal content.

Deleting `/usr/share/man` has been removed as a default cleanup command due to side effects of preventing installation of some other Debian packages.

### Use the `--no-install-recommends` with `apt-get`

Whenever upgrading or installing packages with `apt-get`, use the `--no-install-recommends` flag to ensure that `apt-get` installs only the minimum packages required.

### Omit `apt-get clean`

Per the Docker documentation [Building best practices](https://docs.docker.com/build/building/best-practices/#apt-get), you don't need to add `apt-get clean`, since the Docker images implicitly run that command after every `apt-get` execution.

> Official Debian and Ubuntu images automatically run `apt-get clean`, so explicit invocation is not required.

## Tool versions

It is a good idea to print versions of the installed tools and username at the end of the build, like

```
# versions of local tools
RUN echo  " node version:    $(node -v) \n" \
  "npm version:     $(npm -v) \n" \
  "yarn version:    $(yarn -v) \n" \
  "typescript version:  $(tsc -v) \n" \
  "debian version:  $(cat /etc/debian_version) \n" \
  "user:            $(whoami) \n"
```

## Multi-Architecture Support

As of Cypress 10.2.0, `arm64` and `x64` are both supported.

In CI, the images are built and tested in real `arm64` and `x64` architectures. Then, via `binfmt` and `docker buildx`, we build `x64` and cross-build `arm64` from the same machine, and then publish that image to Docker Hub. The `docker buildx` step runs a second time to push to Amazon ECR:

<!-- diagram generated w/ https://asciiflow.com/ -->

```text
┌────────────────────┐     ┌──────────────────┐
│arm64 build+test job│     │x64 build+test job│
└──────────┬─────────┘     └────────┬─────────┘
           │                        │
┌──────────▼────────────────────────▼─────────┐
│x64 build+push job                           │
│  ┌──────────────────────────────────────┐   │
│  │       build+push to Docker Hub       │   │
│  └──────────────────┬───────────────────┘   │
│                     │                       │
│  ┌──────────────────▼───────────────────┐   │
│  │         build+push to AWS ECR        │   │
│  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```
