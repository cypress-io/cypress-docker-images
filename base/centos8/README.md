# cypress/base:centos8

## Example

Sample Dockerfile

```
FROM cypress/base:centos8
RUN npm install --save-dev cypress
RUN $(npm bin)/cypress verify
RUN $(npm bin)/cypress run
```
