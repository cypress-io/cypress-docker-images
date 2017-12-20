# cypress/browsers:firefox57

A complete image with all dependencies for Cypress included AND Firefox v57 browser.

[Dockerfile](Dockerfile)

## Example

If you want to build your image

```
FROM cypress/browsers:firefox57
RUN npm i cypress
RUN firefox --version
RUN $(npm bin)/cypress run --browser firefox
```

This image uses the default user `node`.
