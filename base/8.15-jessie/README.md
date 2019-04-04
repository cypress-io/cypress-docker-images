# cypress/base:8.15-jessie

## Example

Sample Dockerfile

```Dockerfile
FROM cypress/base:8.15-jessie

RUN npm install --save-dev cypress
RUN $(npm bin)/cypress verify
RUN $(npm bin)/cypress run
```
