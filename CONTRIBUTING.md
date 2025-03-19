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

To publish a new image for `factory`, `base`, `browsers`, or `included`, open a PR with the desired version(s) updated in the [factory/.env](./factory/.env) file. If you change any of the following environment variables in [factory/.env](./factory/.env), then you should also bump the `FACTORY_VERSION` in the same file and make a note of the change in the factory [CHANGELOG](./factory/CHANGELOG.md):

- `BASE_IMAGE`
- `FACTORY_DEFAULT_NODE_VERSION`
- `YARN_VERSION`

You should not change the `FACTORY_VERSION` or make an entry into the factory [CHANGELOG](./factory/CHANGELOG.md) if you are only changing browser versions or the Cypress version.

Once the PR is merged into the `master` branch, the corresponding images will be pushed to [Docker Hub](https://hub.docker.com/u/cypress) and to the [Amazon ECR (Elastic Container Registry) Public Gallery](https://gallery.ecr.aws/cypress-io) via an automated script run through [CircleCI](circle.yml). Please check that the CI jobs pass after merge. Any CI failure can cause the release process to be interrupted.

##### Alternate versions

> Note: Assistance from a member of the Cypress org is required for this process

If you need to release alternate versions that do not qualify to be primary versions, do not modify the contents of the [factory/.env](./factory/.env) file in the `master` branch. An example would be to publish images including updated [Node.js releases](https://nodejs.org/en/about/previous-releases) in the category "Maintenance LTS" or "Current". Instead, carry out the following steps:

1. Create a feature branch in the form `<cypress-version>-node-<node.js version>-publish`, for example `13.11.0-node-18.20.3-publish`, branched from the `master` branch. If you are not a member of the Cypress org, make a request via a new issue to create a feature branch.
2. Modify [factory/.env](./factory/.env) with the desired versions. Do not modify the `FACTORY_VERSION`. No new `cypress/factory` image should be published with this process.
3. Modify [factory/docker-compose.yml](./factory/docker-compose.yml) to comment out the creation of `latest` tags. Comment out the `cypress/included` `INCLUDED_IMAGE_SHORT_TAG` to also prevent this tag from being created. This step is essential to avoid the related tags of any existing released images being moved to point to non-primary images.
4. Modify [circle.yml](circle.yml) to push releases from the feature branch.
5. Open a PR which targets the feature branch.
6. After PR merge, check Docker Hub and the associated new image(s).

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

The `BASE_IMAGE` defined in [factory/.env](./factory/.env) uses a [Debian Docker image](https://hub.docker.com/_/debian) and the current `BASE_IMAGE` is `debian:12-slim` (codename `bookworm`). To keep the image size of the generated Cypress Docker images to a minimum, choose the `slim` variant when other versions of Debian are used, for instance when [Debian releases](https://www.debian.org/releases/) a new major version.

To see the size of an image, you can use the command [`docker images`](https://docs.docker.com/engine/reference/commandline/images/), for instance with:

```shell
docker images --format "table {{.Repository}} {{.Tag}} {{.Size}}"
```

A snapshot of current sizes shows:

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

### Updating images to add `linux/arm64`

Using the `docker` CLI, you can build the `linux/arm64` image of an image, glue the existing `linux/amd64` image to it to create a "manifest list", and then push that to update the current tag on the registry. The end result is that `amd64` users will see no change at all, while `arm64` users will now get the correct `arm64` image.

<details>
<summary>Step-by-step instructions:</summary>

These steps assume you have Docker Hub and ECR credentials.

When following these steps, you may get into a state where you have cached copies of images causing wrong behavior. If this happens, delete the offending images, or `docker system prune --all` to be safe.

1. Ensure that the entire `FROM` chain of this image has a `linux/arm64` version, and follow this guide for those `FROM` images if necessary. For example, generating an `arm64` `cypress/browsers:node1.2.3-chrome100` would require an `arm64` `cypress/base:1.2.3` image.
2. Re-run the `yarn add:<type>:image` command to update the `Dockerfile` folder with any changes in the build scripts. The correct command is at the top of every `build.sh` file in a comment. Verify that this has replaced the existing image and not caused any unexpected changes, like generating in the wrong directory.
3. `cd` into the `Dockerfile` folder.
4. Build the image and tag it with `tmp`:
   ```shell
   docker build -t cypress/<image>:tmp --platform linux/arm64 .
   ```
5. Manually validate that the image works as expected and is really in `arm64`:
   ```shell
   docker run -it cypress/<image>:tmp node -p "process.arch" # expect arm64
   ```
6. Push the `tmp` tag, and record the digest string (`sha256:hexadecimal...`). This is your `arm64` digest string.
   ```shell
   docker push cypress/<image>:tmp
   # example output:
   # [...]
   # tmp: digest: sha256:6c38510771b756153b6f4d54c3ef9185006c1659f725e79d4999cd6304720353 size: 3659
   ```
7. Find the current `amd64` digest string, either by using Docker Hub to browse tags, or `docker image inspect cypress/...`
8. Create a combined manifest using the existing name:

   ```shell
   docker manifest create cypress/<image>:<tag> \
     cypress/<image>:tmp@sha256:rest-of-arm64-digest \
     cypress/<image>:<tag>@sha256:rest-of-amd64-digest

   # example:
   # docker manifest create cypress/included:10.3.0 \
   #  cypress/included:tmp@sha256:6c38510771b756153b6f4d54c3ef9185006c1659f725e79d4999cd6304720353 \
   #  cypress/included:10.3.0@sha256:942468cdb722c408607093f60eeb1b4ff098a384f9123bf2ded36f55d4c96352
   ```

9. Run `docker manifest push cypress/<image>:<tag>` to push the completed manifest to Docker Hub.
10. Validate that the pushed image is correct.
11. To publish to ECR, use `docker login` to switch accounts and follow the below, slightly modified, steps - you don't need to rebuild the `linux/arm64` version. ECR Digest strings may differ from the Hub Digest strings since they are built separately.
    ```shell
    docker login --username AWS --password $(aws ecr-public get-login-password --region us-east-1) public.ecr.aws/cypress-io
    # tag+push the arm64 build to public.ecr.aws
    docker tag cypress/$IMAGE_NAME:$TAG@sha256:$ARM64_DIGEST public.ecr.aws/cypress-io/cypress/$IMAGE_NAME:tmp
    # create a local tag for the public.ecr.aws amd64 build
    docker pull public.ecr.aws/cypress-io/cypress/$IMAGE_NAME:$TAG
    # create an arm64+amd64 manifest + replace the old image with the manifest
    docker manifest create public.ecr.aws/cypress-io/cypress/$IMAGE_NAME:$TAG public.ecr.aws/cypress-io/cypress/$IMAGE_NAME:$TAG public.ecr.aws/cypress-io/cypress/$IMAGE_NAME:tmp
    docker manifest push public.ecr.aws/cypress-io/cypress/$IMAGE_NAME:$TAG
    ```
12. Delete the `tmp` tag.
</details>
