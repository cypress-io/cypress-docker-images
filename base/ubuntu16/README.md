# cypress/base:ubuntu16

This image was built to resolve [issue #19](https://github.com/cypress-io/cypress-docker-images/issues/19)

## Example

Sample Dockerfile

```
FROM cypress/base:ubuntu16
RUN npm install --save-dev cypress
RUN $(npm bin)/cypress verify
RUN $(npm bin)/cypress run
```
