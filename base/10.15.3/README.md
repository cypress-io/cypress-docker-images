# cypress/base:10.15.3

## Example

Sample Dockerfile

```
FROM cypress/base:10.15.3
RUN npm install --save-dev cypress
RUN $(npm bin)/cypress verify
RUN $(npm bin)/cypress run
```
