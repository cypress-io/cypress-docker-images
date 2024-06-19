# cypress/base-internal

>[!NOTE]
>`cypress/base-internal` Docker images are intended for internal Cypress.io use only. Please see [cypress/base](../base) for public images.

For content details of each image, see the corresponding [releases](./releases/) sub-directory.

## Tags

[cypress/base-internal](https://hub.docker.com/r/cypress/base-internal/tags) images on [Cypress on Docker Hub](https://hub.docker.com/u/cypress) use image tags in the form:

- `<node version>`
- `<operating system>`-node`<node version>`

for example:

- `cypress/base-internal:18.20.2`
- `cypress/base-internal:ubuntu24-node18`

Images which do not contain an operating system in their tag are based on Debian.
