# cypress/base:12.16.0

A Docker image with all dependencies pre-installed.
Just add your NPM packages (including Cypress) and run the tests.
See [Cypress Docker docs](https://on.cypress.io/docker) and
[Cypress CI guide](https://on.cypress.io/ci).

## Example

Sample Dockerfile

```
FROM cypress/base:12.16.0
RUN npm install --save-dev cypress
RUN $(npm bin)/cypress verify
RUN $(npm bin)/cypress run
```
