# cypress/base:8.2.1

## Example

Sample Dockerfile

```
FROM cypress/base:8.2.1
RUN npm install --save-dev cypress
RUN $(npm bin)/cypress verify
RUN $(npm bin)/cypress run
```
