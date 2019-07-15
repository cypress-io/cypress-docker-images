# cypress/base:8.9.3-npm-6.10.1

Includes Chinese fonts, see [Dockerfile](Dockerfile)

## Example

Sample Dockerfile

```
FROM cypress/base:8.9.3-npm-6.10.1
RUN npm install --save-dev cypress
RUN $(npm bin)/cypress verify
RUN $(npm bin)/cypress run
```
