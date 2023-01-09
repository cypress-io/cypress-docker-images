# Test-project

This test project was generated via the cypress GUI.

In the event of a breaking major change this project can be updated by:

1. Remove the following folders/files
    * `cypress` folder
    * `cypress.config.js` file
2. run command `npm install cypress@<latest version> --save-dev`
3. run command `cypress open`
4. Configure `e2e testing`, accept defaults
5. Run in chrome
6. Choose `Scaffold example specs`
7. Exit Cypress
8. Remove cypress from package.json

## Tests

Tests are run via the the included docker compose file.
The tests in the docker compose file rely on factory images, so those must be built first.
Additionally, to run these tests you must export the environment variables in /factory/.env with `set -a && . ../.env && set +a`
