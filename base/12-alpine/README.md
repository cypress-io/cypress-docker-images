# cypress/base:12-alpine

## Example

Sample Dockerfile

```
FROM cypress/base:12-alpine
RUN npm install --save-dev cypress
RUN $(npm bin)/cypress verify
RUN $(npm bin)/cypress run
```
