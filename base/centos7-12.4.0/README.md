# cypress/base:centos7

This image was built to resolve [issue #18](https://github.com/cypress-io/cypress-docker-images/issues/18)

## Example

Sample Dockerfile

```
FROM cypress/base:centos7
RUN npm install --save-dev cypress
RUN $(npm bin)/cypress verify
RUN $(npm bin)/cypress run
```
