# cypress/base:manjaro-14.12.0

This image was built to resolve [issue #378](https://github.com/cypress-io/cypress-docker-images/issues/378)

## Example

Sample Dockerfile

```
FROM cypress/base:manjaro-14.12.0
RUN npm install --save-dev cypress
RUN $(npm bin)/cypress verify
RUN $(npm bin)/cypress run
```
