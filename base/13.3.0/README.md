# cypress/base:13.3.0

## Example

Sample Dockerfile

```
FROM cypress/base:13.3.0
RUN npm install --save-dev cypress
RUN $(npm bin)/cypress verify
RUN $(npm bin)/cypress run
```
