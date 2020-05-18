# Contributing to Cypress

Thanks for taking the time to contribute! :smile:

## Code of Conduct

All contributors are expecting to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Development

### Add new base image

To create a new base image follow these steps

1. run `npm run add:base -- <new version>` script. For example `npm run add:base -- 13.6.0`

It will create a new folder `base/<new version>` and output versions of tools installed: Node, npm, yarn, etc. See [generate-base-image.js](generate-base-image.js) file for details.

2. add new line to [base/README.md](base/README.md) with new image information.
3. add new folder to Git
4. update [circle.yml](circle.yml) file by running `npm run build` and commit the changes.
4. open a pull request.

The new image will be built and tested on CI and pushed to Docker Hub once the PR is approved and merged to `master`.

**note:** we should install the latest NPM and Yarn versions in the base image to ensure old images do not include NPM and Yarn with known issues that have been fixed already.

**note 2:** we install Chinese fonts in the base image to allow correct testing of [cypress-documentation](https://github.com/cypress-io/cypress-documentation) site that includes several translations of the Cypress docs. Without Chinese fonts the pages have broken rendering.

### Add new image with browsers

TODO: https://github.com/cypress-io/cypress-docker-images/issues/215

**Important:** prefer to use exact browser versions for repeatable builds. You can find the previous official Chrome version numbers at [https://chromereleases.googleblog.com/](https://chromereleases.googleblog.com/).

**Important:** use `https:` to download browsers

### Add new included image

To create a new image with Cypress pre-installed globally

1. run `npm run add:included -- <Cypress version> <base image tag>`. For example `npm run add:included -- 3.8.3 cypress/browsers:node12.6.0-chrome77`.

This will create new folder `included/<Cypress version>`

2. add new line to [included/README.md](included/README.md) file with the new image information
3. add new folder to Git
4. update [circle.yml](circle.yml) file by running `npm run build` and commit the changes.
4. open a pull request.

## Bonus: smaller images

Pull request [#83](https://github.com/cypress-io/cypress-docker-images/pull/83) shows how to create smaller Docker images. Follow that PR's advice when creating new images.

To see the final size of an image, you can use command [`docker images`](https://docs.docker.com/engine/reference/commandline/images/)

```
$ docker images --format "{{.Tag}} {{.Size}}" cypress/base:11.13.0
11.13.0 969MB
```

I would put this information into the image folder README file.

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
