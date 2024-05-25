# Contributing to Cypress

Thanks for taking the time to contribute! :smile:

## Code of Conduct

All contributors are expecting to abide by our [Code of Conduct](https://github.com/cypress-io/cypress/blob/develop/CODE_OF_CONDUCT.md).

## Development

### Replacing existing images

⚠️ As a rule, unless there are extraordinary circumstances, we do NOT replace the existing Docker images. Replacing the images already used by people is dangerous, since it replaces the versions of tools without warning. We have such failed experience once, and do not want to repeat this mistake. Thus instead of replacing an existing image, in 99% of the cases we publish a new Docker image.

### Building locally

We use docker compose to build the factory locally.

```bash
cd factory
docker compose build factory
```

With the factory image built, you can now build the other included images

```bash
# This builds the 'included' image specified in the docker-compose file.
docker compose build included

# This builds all images specified in the docker-compose file.
docker compose build
```

Or you can then run tests in the test-project

```bash
cd test-project

# set the environment variables from factory/.env in your terminal.
set -a && . ../.env && set +a

# run the test in an image built on top of the factory.
docker compose run test-factory-all-included
```

### Publishing images

#### Automatic

To publish a new image for `factory`, `included`, `browsers`, and `base`, open a PR with the desired version(s) updated in the `factory/.env` file. Once the PR is merged into master, the corresponding images will be pushed to dockerhub via an automated script run in CI. Please check that the CI jobs pass after merge.

In general, `factory/.env` master should contain the latest versions we officially support. If you need to release an older version please modify `circle.yml` to push releases from a feature branch instead of setting the version in master to older versions.

#### Manual

>Note: This requires being a member of the Cypress org

`base-internal` and `browsers-internal` images are not automatically published after changes are merged. They require manual publishing to dockerhub. To manual publish:

1. Generate the corresponding files within the `base-internal` and/or `browsers-internal` directories that you want to generate the image from.
2. Log into Docker Desktop using `cypressdockerpublisher` credentials.
3. Follow the instructions to build the image from within the generated Dockerfile within the appropriate directory in order to build the image locally.
4. Select 'Push to Hub' on the generate image within Docker Desktop.
5. Check dockerhub to ensure the new image it published and test that it works.

![](https://github.com/cypress-io/cypress/assets/1271364/85507060-acc3-48b5-bc16-4160c4620e1e)

#### To forward X11 from inside a docker container to a host running macOS

If you need to test that the image works with Cypress, you can follow these instructions if on a MacOS machine, which might prove helpful when debugging image dependencies:

1. Install XQuartz: https://www.xquartz.org/
2. Launch XQuartz.  Under the XQuartz menu, select Settings
3. Go to the security tab and ensure "Allow connections from network clients" is checked.
4. From the XQuarts terminal, run `xhost + ${hostname}` to allow connections to the macOS host
5. From the XQuarts terminal, Setup a HOSTNAME env var `` export HOSTNAME="host.docker.internal:0" ``
6. From the XQuarts terminal, run your docker image like such:

```bash
docker run --rm -it -e DISPLAY="host.docker.internal:0" -v /tmp/.X11-unix:/tmp/.X11-unix --entrypoint bash <YOUR_IMAGE_TAG>
 ```

 When executing `npx cypress open` from the docker container, the display should now be visible!

## Releasing a new factory version

To release a new [factory](./factory/README.md), open a PR with the desired changes to the [factory.Dockerfile](./factory/factory.Dockerfile) or [installScripts](./factory/installScripts/). After making changes, note the changes in the factory [CHANGELOG](./factory/CHANGELOG.md) and bump the `FACTORY_VERSION` in the [.env](./factory/.env) file to trigger a new release.

## Minimize image sizes

By default, the current base image is `bullseye-slim`. This dramatically decreases the size of all images. Other optimizations have been made to the Dockerfiles per Docker's recommendations.

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

A current limitation is that no `arm64` images have browser binaries - see https://github.com/cypress-io/cypress-docker-images/issues/695 for details.

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
