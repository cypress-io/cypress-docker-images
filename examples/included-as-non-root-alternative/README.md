# Running cypress/included image as non-root (alternative)

In this example, we build a new Docker image on top of `cypress/included` image, but we give all users read access to the folder `/root` where Cypress NPM package and Cypress binary are installed, see [Dockerfile](Dockerfile)

As a second step, we set the environment variable `CYPRESS_CACHE_FOLDER=/root/.cache/Cypress` to ensure that every user can find the cached binary and use it to run tests.

You can build the `cypress/example` image and run current tests as built-in second user `node` (comes from Node base image) with:

```shell
$ ./build.sh
$ ./test.sh
```
