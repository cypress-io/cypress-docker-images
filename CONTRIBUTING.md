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

We build individual base images that match Node versions: `10.18.1`, `12.12.0`, `12.18.2`, etc. We also tag some of the images with major version: `base:10`, `base:12`. We also tag one image `base:latest`. In general, consumers should use the explicit version like `base:12.18.0` because it guarantees that the Docker image will never be suddenly updated.

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

## Bonus: smaller images

By default, the current base image is `bullseye-slim`. This dramatically decreases the size of all images. Other optimizations have been made to the Dockerfiles per Docker's recommendations.

In order to allow for older images to be smaller, you can run the scripts above using existing node versions, Cypress versions, and browser versions. The scripts will recognize that a folder already exists, and append `-slim` to the folder. You can then update the folder name in your workflow, and use the images like you already were.

Node versions less than or equal to Node 14 will use the `buster-slim` base image if they are recreated. Older images may still rely on `buster`.

To see the final size of an image, you can use command [`docker images`](https://docs.docker.com/engine/reference/commandline/images/)

```
$ docker images --format "{{.Tag}} {{.Size}}" cypress/base:11.13.0
11.13.0 969MB
```

## Bonus 2: tool versions

It is a good idea to print versions of the installed tools and username at the end of the build, like

```
# versions of local tools
RUN echo  " node version:    $(node -v) \n" \
  "npm version:     $(npm -v) \n" \
  "yarn version:    $(yarn -v) \n" \
  "debian version:  $(cat /etc/debian_version) \n" \
  "user:            $(whoami) \n"
```
