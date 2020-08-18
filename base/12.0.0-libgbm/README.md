# cypress/base:12.0.0-libgbm

## Example

Sample Dockerfile

```
FROM cypress/base:12.0.0-libgbm
RUN npm install --save-dev cypress
RUN $(npm bin)/cypress verify
RUN $(npm bin)/cypress run
```
