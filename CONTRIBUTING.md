# Contributing to Cypress

Thanks for taking the time to contribute! :smile:

## Code of Conduct

All contributors are expecting to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Development

To create a new base image follow these steps

1. copy an existing folder, for example

```shell
cp -r ./base/8.2.1 ./base/8.15.1
```

2. update the version label in all files in the new folder: the shell script, the Dockerfile and the README
3. build the local image using the shell script

```sh
./build.sh
```

This will create a local Docker image, for example `cypress/base:8.15.1`.

4. Test the new image using [./test](test) script
  - update the Dockerfile to derive test image from the new image
  - run the build script that will create the new Docker container, install Cypress, initialize a tiny project and run the tests

5. If the new Docker image works locally, push it to the Docker hub using `docker push <image name>`
6. Add the new image name to the README files

## Bonus: smaller images

Pull request [#83](https://github.com/cypress-io/cypress-docker-images/pull/83) shows how to create smaller Docker images. Follow that PR's advice when creating new images.

To see the final size of an image, you can use command [`docker images`](https://docs.docker.com/engine/reference/commandline/images/)

```
$ docker images --format "{{.Tag}} {{.Size}}" cypress/base:11.13.0
11.13.0 969MB
```

I would put this information into the image folder README file.
