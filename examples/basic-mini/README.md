# examples/basic-mini

This directory contains a simple example of a Cypress E2E test with one test spec `cypress/e2e/spec.cy.js`. The example is intended for use with a Cypress Docker image `cypress/included` which includes a version of Cypress installed in the image. In order to avoid potential version conflicts between the example and the Docker image there is no Cypress version included in the [package.json](package.json) file.

## Non-Docker demonstration

Unlike the related [basic](../basic/) example, this example is not suited to be run without a Docker image, since it does not include Cypress (see above for explanation).
