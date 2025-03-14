# Reporting Security Issues

If you believe you've found a potential security issue in any Cypress Docker image please consider the following:

- Cypress Docker images released through this repo are convenience images with selected bundled and versioned components.
- They are intended for use in Continuous Integration (CI) or other non-public, isolated, sandboxed environments.
- Any security issue must be addressed by the component owner before any related fix can flow into a new Cypress Docker image.
- Released images are considered frozen and remain released. Newest packages have the tag `latest` applied.

## Debian

Each time a new [cypress/factory][factory] image is built, it uses the base Docker image defined as `BASE_IMAGE` in the [factory/.env](./factory/.env) file and installs any additional Debian packages from the stable distribution. This means any security issues which have been resolved by Debian are resolved in a new [cypress/factory][factory] build. Other Cypress Docker images are built on top of [cypress/factory][factory] and include any Debian security fixes as well.

Refer to [Debian security](https://www.debian.org/security/) for further information.

Debian is used in [cypress/factory][factory], [cypress/base][base], [cypress/browsers][browsers] and [cypress/included][included] Cypress Docker images.

## Browsers

Please refer to the associated browser owner's documentation regarding browser security vulnerabilities.

Browsers are included in [cypress/browsers][browsers] and [cypress/included][included] Cypress Docker images.

## Cypress

For issues with Cypress, we recommend checking the [Cypress issue list](https://github.com/cypress-io/cypress/issues) to see if a vulnerability has already been reported there. Otherwise Cypress [Security and Compliance](https://cypress.io/security/) provides more information on reporting a security issue.

Cypress is included only in [cypress/included][included] Cypress Docker images.

[factory]: https://github.com/cypress-io/cypress-docker-images/tree/master/factory
[base]: https://github.com/cypress-io/cypress-docker-images/tree/master/base
[browsers]: https://github.com/cypress-io/cypress-docker-images/tree/master/browsers
[included]: https://github.com/cypress-io/cypress-docker-images/tree/master/included
