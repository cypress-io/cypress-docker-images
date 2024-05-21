# Test-project

This test project was generated via the Cypress GUI.

This project can be updated to the latest Cypress default scaffolded E2E test specs by carrying out the following steps in the directory `/factory/test-project`:

```shell
rm -rf cypress cypress.config.js
npm install cypress@latest --no-package-lock
npx cypress open
```

- Select "E2E Testing"
- Select "Electron" browser
- Select "Continue"
- Select "Scaffold example specs"
- Close all Cypress windows

Test that scaffolded specs run:

```shell
npm test
```

Remove Cypress from `package.json`:

```shell
npm uninstall cypress --no-package-lock
```

## Tests

Tests are run via the included [docker-compose](docker-compose.yml) file.
The tests rely on factory images, so those must be built first.
Additionally, to run these tests you must export the environment variables in [/factory/.env](../.env) with:

```shell
set -a && . ../.env && set +a
```

See [CONTRIBUTING > Development](../../CONTRIBUTING.md#development) for step-by-step instructions.
