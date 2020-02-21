# cypress/base:8.0.0

Includes Chinese fonts, see [Dockerfile](Dockerfile)

## Example

Sample Dockerfile

```
FROM cypress/base:8.0.0
RUN npm install --save-dev cypress
RUN $(npm bin)/cypress verify
RUN $(npm bin)/cypress run
```