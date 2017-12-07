# cypress/browsers:chrome62

A complete image with all dependencies for Cypress included AND Chrome v62 browser.

[Dockerfile](Dockerfile)

## Example

If you want to build your image

```
FROM cypress/browsers:chrome63
RUN npm i cypress
RUN google-chrome --version
RUN $(npm bin)/cypress run --browser chrome
```

This image switches to non-root user `person` to run.
