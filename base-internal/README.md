# cypress/base-internal

<!-- prettier-ignore-start -->
> [!NOTE]
> `cypress/base-internal` Docker images are intended for internal Cypress.io use only. Please see [cypress/base](../base) for public images.
<!-- prettier-ignore-end -->

For content details of each image, see the corresponding [releases](./releases/) sub-directory.

## Tags

[cypress/base-internal](https://hub.docker.com/r/cypress/base-internal/tags) images on [Cypress on Docker Hub](https://hub.docker.com/u/cypress) use image tags in the form:

- `<node version>`
- `<operating system>`-node`<node version>`

for example:

- `cypress/base-internal:18.20.2`
- `cypress/base-internal:ubuntu24-node18`

Images which do not contain an operating system in their tag are based on Debian.

## Obsolete Releases

Build information for the following internal images is no longer kept in the default branch of the repo and is instead linked to a historical commit where the information is preserved:

- [base-internal/releases/node-18](https://github.com/cypress-io/cypress-docker-images/tree/d7236afec49a2fb9be8f81c8d34f20e6166bcc57/base-internal/releases/node-18)

The related internal images remain in the [cypress/base-internal](https://hub.docker.com/r/cypress/base-internal/tags) Docker Hub container image repository.
