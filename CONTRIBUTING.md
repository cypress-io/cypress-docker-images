# Contributing to Cypress

Thanks for taking the time to contribute! :smile:

## Code of Conduct

All contributors are expecting to abide by our [Code of Conduct](https://github.com/cypress-io/cypress/blob/develop/CODE_OF_CONDUCT.md).

## Development

### Replacing existing images

⚠️ As a rule, unless there are extraordinary circumstances, we do NOT replace the existing Docker images. Replacing the images already used by people is dangerous, since it replaces the versions of tools without warning. We have such failed experience once, and do not want to repeat this mistake. Thus instead of replacing an existing image, in 99% of the cases we publish a new Docker image.

### Add new base image

To create a new base image follow these steps

1. run `yarn add:base -- <new version>` script. For example `yarn add:base -- 13.6.0`

It will create a new folder `base/<new version>` and output versions of tools installed: Node, npm, yarn, etc. See [generate-base-image.js](scripts/generate-base-image.js) file for details.

2. open a pull request.

The new image will be built and tested on CI and pushed to Docker Hub once the PR is approved and merged to `master`.

**note:** we install Chinese fonts in the base image to allow correct testing of [cypress-documentation](https://github.com/cypress-io/cypress-documentation) site that includes several translations of the Cypress docs. Without Chinese fonts the pages have broken rendering.

### Add new browser image

To create a new image with the specific browser versions needed to run your cypress tests.

1. Run `yarn add:browser <base image tag> --chrome=<chrome version> --firefox=<firefox version> --edge`. For example `yarn add:browser 16.5.0 --chrome=94.0.4606.71 --firefox=93.0`.

This will create a new folder `browser/node<node version>-chrome<chrome version>-ff<firefox version>-edge` See [generate-browser-image.js](scripts/generate-browser-image.js) file for details.

2. Open a pull request.

**Important ⚠️** In order to properly generate a browser image, you must specify a version of Chrome, or a version of Firefox, or a version of Edge.

**note:** The Edge browser will always default to the latest stable release. There is currently no way to specify the downloaded version. For this reason, when generating an image with Edge support users should only pass `--edge`.

**note:** No major browsers are currently compatible with `arm64`, so browsers images will be missing those browsers on `linux/arm64` architecture. As time passes and these become available, we will introduce them to the `arm64` images as well: https://github.com/cypress-io/cypress-docker-images/issues/695.

### Add new included image

To create a new image with Cypress pre-installed globally

1. Run `yarn add:included -- <Cypress version> <base image tag>`. For example `yarn add:included -- 9.4.1 cypress/browsers:node16.13.2-chrome97-ff96`.

**Important ⚠️** please use `cypress/browsers` Docker image with the latest Node version matching the major version of Node included with Cypress. For example, if Cypress is shipping 16.5.0 and the latest 16.x is 16.14.0, ship the included image with Node 16.14.0.

This will create a new folder `included/<Cypress version>` See [generate-included-image.js](scripts/generate-included-image.js) file for details.

2. Open a pull request.

#### Handling included images with different node versions

If there is already a `cypress/included` image with a specific version, but you need a different Node version or browser version, just create a new included image per the instructions above and a folder with the name `<Cypress version>-<base image tag> will be created.`

**Important ⚠️** This only applies if there is an existing `cypress/included` image with the same version.

## Tagging the latest image

We build individual base images that match Node versions: `10.18.1`, `12.12.0`, `12.18.2`, etc. We also tag some of the images with major version: `base:10`, `base:12`. We also tag one image `base:latest`. In general, you should use the explicit version like `base:12.18.0` because it guarantees that the Docker image will never be suddenly updated.

To tag new image, like `base:12.18.2` need to do the following from a local machine

```text
# pull the image to tag
$ docker pull cypress/base:12.18.2
# tag that image with major version
$ docker tag cypress/base:12.18.2 cypress/base:12
# tag that image with "latest"
$ docker tag cypress/base:12.18.2 cypress/base:latest

# push the new images (which are the same)
$ docker push cypress/base:12
$ docker push cypress/base:latest
```

## Minimize image sizes

By default, the current base image is `bullseye-slim`. This dramatically decreases the size of all images. Other optimizations have been made to the Dockerfiles per Docker's recommendations.

In order to allow for older images to be smaller, you can run the scripts above using existing node versions, Cypress versions, and browser versions. The scripts will recognize that a folder already exists, and append `-slim` to the folder. You can then update the folder name in your workflow, and use the images like you already were.

Node versions less than or equal to Node 14 will use the `buster-slim` base image if they are recreated. Older images may still rely on `buster`.

To see the final size of an image, you can use command [`docker images`](https://docs.docker.com/engine/reference/commandline/images/)

```bash
$ docker images --format "{{.Tag}} {{.Size}}" cypress/base:11.13.0
11.13.0 969MB
```

### Clean up `apt-get` artifacts

Calling `apt-get` creates artifacts that are not necessary to the image, and these artifacts bloat the image size and all images that inherit from it.

To avoid bloating the Docker layers with extraneous files, after every `RUN` call with `apt-get`, add these cleanup commands within the same `RUN`:

```bash
rm -rf /usr/share/doc && \
  rm -rf /usr/share/man && \
  rm -rf /var/lib/apt/lists/*
```

### Use the `--no-install-recommends` with `apt-get`

Whenever upgrading or installing packages with `apt-get`, use the `--no-install-recommends` flag to ensure that `apt-get` installs only the minimum packages required.

### Omit `apt-get clean`

Per the official Docker documentation, you don't need to add `apt-get clean`, since the Docker images implicitly run that command after every `apt-get` execution.

>Official Debian and Ubuntu images automatically run `apt-get clean`, so explicit invocation is not required.

-[Best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#run)

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

In CI, the images are built and tested in real `arm64` and `x64` architectures. Then, via `binfmt` and `docker buildx`, we build x64 and cross-build arm64 from the same machine, and then publish that image to Docker Hub. The `docker buildx` step runs a second time to push to Amazon ECR:

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

It would be nice to re-publish the Docker Hub images verbatim to ECR instead of building twice, but more work needs to be done in this area - see the `push-images` step in `circle.yml` for details.

A current limitation is that no `arm64` images have browser binaries - see https://github.com/cypress-io/cypress-docker-images/issues/695 for details. [`global-profile.sh`](./scripts/for-images/global-profile.sh) is placed in `/etc/bash.bashrc`, so Arm Docker users will see a warning about this limitation.

### Updating images to add `linux/arm64`

Using the `docker` CLI, you can build the `linux/arm64` image of an image, glue the existing `linux/amd64` image to it to create a "manifest list", and then push that to update the current tag on the registry. The end result is that `amd64` users will see no change at all, while `arm64` users will now get the correct `arm64` image.

<details>
<summary>Step-by-step instructions:</summary>

These steps assume you have Docker Hub and ECR credentials.

When following these steps, you may get into a state where you have cached copies of images causing wrong behavior. If this happens, delete the offending images, or `docker system prune --all` to be safe.

1. Ensure that the entire `FROM` chain of this image has a `linux/arm64` version, and follow this guide for those `FROM` images if necessary. For example, generating an `arm64` `cypress/browsers:node1.2.3-chrome100` would require an `arm64` `cypress/base:1.2.3` image.
2. Re-run the `yarn add:<type>:image` command to update the Dockerfile folder with any changes in the build scripts. The correct command is at the top of every `build.sh` file in a comment. Verify that this has replaced the existing image and not caused any unexpected changes, like generating in the wrong directory.
3. `cd` into the Dockerfile folder.
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
