# examples/chrome-for-testing

This directory contains a simple example of a Cypress E2E test with one test spec `cypress/e2e/spec.cy.js` running using the [Google Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) browser under the `linux/amd64` platform.

Note that Chrome for Testing is currently not available for the `linux/arm64` platform.

## Docker

### Docker build and run

In this example we use a customized `Dockerfile` which bases a new image on `cypress/base`, copies the complete Cypress project into the image, including installed dependencies, then installs the Cypress binary and Chrome for Testing into the image.

The file is [examples/chrome-for-testing/Dockerfile](./Dockerfile). It has the following contents which build a custom Docker image using the `stable` version of Chrome for Testing:

```dockerfile
FROM cypress/base
COPY . /opt/app
WORKDIR /opt/app
# Install Cypress binary
RUN npx cypress install
# Install Chrome for Testing
ARG CHROME_VERSION=stable
RUN INSTALL_OUTPUT=$(npx @puppeteer/browsers install chrome@${CHROME_VERSION} --path /tmp/chrome-for-testing) && \
DOWNLOAD_DIR=$(echo "$INSTALL_OUTPUT" | grep -o '\/.*\/chrome-linux64') && \
mv $DOWNLOAD_DIR /opt/chrome-for-testing
RUN ln -fs /opt/chrome-for-testing/chrome /usr/local/bin/chrome
RUN rm -rf /tmp/chrome-for-testing
```

We build the new image, run the container from the image and execute the Cypress command `npx cypress run --browser chrome-for-testing` to run the test using Chrome for Testing:

```shell
cd examples/chrome-for-testing              # Use a pre-configured simple Cypress E2E project
npm ci                                      # Install all dependencies
docker build -t test-chrome-for-testing .   # Build a new image
docker run --rm --entrypoint bash test-chrome-for-testing -c "npx cypress run --browser chrome-for-testing" # Run Cypress test using Chrome for Testing
```

To build the Docker image with a different version of Chrome for Testing, change the value of the Docker environment variable `CHROME_VERSION.` Any value accepted by [@puppeteer/browsers](https://pptr.dev/browsers-api) is valid. This includes:
- an explicit full version e.g. `131.0.6778.204`
- a major version e.g. `131`
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

To test a set of Chrome for Testing version selections (channel alias: `stable`, `beta`, `dev`, `canary`, explicit full version & major version), execute:

```shell
cd examples/chrome-for-testing
./scripts/test.sh
```

## References

Google Chrome for Testing:

- [Blog](https://developer.chrome.com/blog/chrome-for-testing/)
- [List of current versions](https://googlechromelabs.github.io/chrome-for-testing/)
- [Repository](https://github.com/GoogleChromeLabs/chrome-for-testing)
- [Available downloads](https://googlechromelabs.github.io/chrome-for-testing/files)

Installation using

- [@puppeteer/browsers](https://pptr.dev/browsers-api)
