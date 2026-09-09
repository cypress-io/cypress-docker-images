# examples/chrome-for-testing

This directory contains a simple example of a Cypress E2E test with one test spec `cypress/e2e/spec.cy.js` running using the
[Google Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) browser
under the `linux/amd64` and `linux/arm64` platforms.

[Chrome for Testing > Supported platforms](https://github.com/GoogleChromeLabs/chrome-for-testing#supported-platforms)
lists `linux/arm64` as supported since `v153.0.8001.0`.

## Docker

The example below downloads Chrome for Testing using [@puppeteer/browsers](https://pptr.dev/browsers-api).

[cypress/factory](../../factory/) also supports building a custom Docker image with Chrome for Testing using the parameter [CHROME_FOR_TESTING_VERSION](../../factory/README.md#chrome_for_testing_version) which must be a full version specification. This is more restrictive than the example below with [@puppeteer/browsers](https://pptr.dev/browsers-api), which has the flexibility of using a version alias, such as `stable` or a short version specification.

### Docker build and run

In this example we use a customized `Dockerfile` [examples/chrome-for-testing/Dockerfile](./Dockerfile) which bases a new image on `cypress/base`,
copies the complete Cypress project into the image, including installed dependencies,
then installs the Cypress binary and Chrome for Testing into the image.
It downloads the `stable` version of Chrome for Testing using [@puppeteer/browsers](https://pptr.dev/browsers-api).

We build the new image, run the container from the image and execute the Cypress command `npx cypress run --browser chrome-for-testing` to run the test using Chrome for Testing:

```shell
cd examples/chrome-for-testing              # Use a pre-configured simple Cypress E2E project
npm ci                                      # Install all dependencies
docker build -t test-chrome-for-testing .   # Build a new image
docker run --rm --entrypoint bash test-chrome-for-testing -c "npx cypress run --browser chrome-for-testing" # Run Cypress test using Chrome for Testing
```

To build the Docker image with a different version of Chrome for Testing, change the value of the Docker environment variable `CHROME_VERSION.` Any value accepted by [@puppeteer/browsers](https://pptr.dev/browsers-api) is valid. This includes:

- an explicit full version e.g. `153.0.8010.36`
- a major version e.g. `153`
- a channel alias:
  - `stable`
  - `beta`
  - `dev`
  - `canary`

The value can be changed by:

- editing the [Dockerfile](./Dockerfile) and replacing the version in `ARG CHROME_VERSION=` or
- adding the version as a `build-arg` to the build command line, for example:

  ```shell
  docker build --build-arg CHROME_VERSION=beta -t test-chrome-for-testing .
  ```

Refer to [Chrome for Testing availability](https://googlechromelabs.github.io/chrome-for-testing/) for current versions or [available downloads](https://googlechromelabs.github.io/chrome-for-testing/files) for other versions.

## Test

To test the `stable` version of Chrome for Testing, execute:

```shell
cd examples/chrome-for-testing
./scripts/test.sh
```

Edit the script `test.sh` to test additional channel aliases: `beta`, `dev`, `canary`, explicit full versions or major versions.

## References

Google Chrome for Testing:

- [Blog](https://developer.chrome.com/blog/chrome-for-testing/)
- [List of current versions](https://googlechromelabs.github.io/chrome-for-testing/)
- [Repository](https://github.com/GoogleChromeLabs/chrome-for-testing)
- [Available downloads](https://googlechromelabs.github.io/chrome-for-testing/files)

Installation using

- [@puppeteer/browsers](https://pptr.dev/browsers-api)
