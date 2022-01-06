# Cypress Docker Images [![CircleCI](https://circleci.com/gh/cypress-io/cypress-docker-images/tree/master.svg?style=svg)](https://circleci.com/gh/cypress-io/cypress-docker-images/tree/master)

These images provide all of the required dependencies for running Cypress in Docker.

We build three main images, click on the image name to see the available tags and versions.

| Image                        | Default                     | Description                                                                       | Monthly pulls                                                                                                                         |
| ---------------------------- | --------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [cypress/base](base)         | `cypress/base:12`           | All operating system dependencies, no Cypress, and no browsers.                   | [![Docker Pulls](https://img.shields.io/docker/pulls/cypress/base.svg?maxAge=604800)](https://hub.docker.com/r/cypress/base/)         |
| [cypress/browsers](browsers) | `cypress/browsers:chrome67` | All operating system dependencies and some browsers.                              | [![Docker Pulls](https://img.shields.io/docker/pulls/cypress/browsers.svg?maxAge=604800)](https://hub.docker.com/r/cypress/browsers/) |
| [cypress/included](included) | `cypress/included:3.2.0`    | All operating system dependencies, Cypress, and some browsers installed globally. | [![Docker Pulls](https://img.shields.io/docker/pulls/cypress/included.svg?maxAge=604800)](https://hub.docker.com/r/cypress/included/) |

Of these images, we provide multiple tags for various operating systems and specific browser versions. These allow you to target specific combinations you need.

## Best practice

It is recommended to use a specific image tag, and not rely on the `default` tag. For example, it is better to use `cypress/base:12` than `cypress/base`. Even better it is to use full version of the image, like `cypress/base:12.18.0` - we will never overwrite the existing Docker images to prevent accidental changes.

## DockerHub

All of the images and tags are published to DockerHub under

- [https://hub.docker.com/r/cypress/base](https://hub.docker.com/r/cypress/base)
- [https://hub.docker.com/r/cypress/browsers](https://hub.docker.com/r/cypress/browsers)
- [https://hub.docker.com/r/cypress/included](https://hub.docker.com/r/cypress/included)

## Examples

These images have all dependencies necessary to install and run Cypress. Just install your NPM dependencies (including Cypress) and run the tests. We utilize many of these docker images in our own projects, with different CI providers.

[Check out our docs for examples.](https://on.cypress.io/docker)

If you want to use the `cypress/included` image, read [Run Cypress with a single Docker command](https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/)

- [examples/included-as-non-root](examples/included-as-non-root) shows how to build a new Docker image on top of `cypress/included` image and run the tests as non-root user `node`.
- [examples/included-as-non-root-alternative](examples/included-as-non-root-alternative) shows another approach to allow built-in non-root user `node` to run tests using `cypress/included` image.
- [examples/included-as-non-root-mapped](examples/included-as-non-root-mapped) shows how to build a Docker image on top of `cypress/included` that runs with a non-root user that matches the id of the user on the host machine. This way, the permissions on any files created during the test run match the user's permissions on the host machine.
- [examples/included-with-plugins](examples/included-with-plugins) shows how to use locally installed [Cypress plugins](https://on.cypress.io/plugins) while running `cypress/included` image.

## Common problems

### Cannot run post-install hook

Some versions of Node restrict running the `postinstall` hook with the following error message:

```text
lifecycle realworld@1.0.0~postinstall: cannot run in wd realworld@1.0.0
```

In that case run install with `npm install --unsafe-perm` flag, or set an environment variable in the container

```shell
npm_config_unsafe_perm: true
```

### Blank screen in Chrome

When running headed tests with X11 forwarding in Cypress v4 you might see a blank Chrome screen. Try disabling memory sharing by setting the following environment variables:

```shell
export QT_X11_NO_MITSHM=1
export _X11_NO_MITSHM=1
export _MITSHM=0
```

See [issue #270](https://github.com/cypress-io/cypress-docker-images/issues/270)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

See [LICENSE](LICENSE)
