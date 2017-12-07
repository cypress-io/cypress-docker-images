# cypress/browsers:chrome63

A complete image with all dependencies for Cypress included AND Chrome v63 browser.

[Dockerfile](Dockerfile)

## Example

If you want to build your image

```
FROM cypress/browsers:chrome63
RUN npm i cypress
RUN google-chrome --version
RUN $(npm bin)/cypress run --browser chrome
```

This image uses the default user `root`. For extra security you might want to run this image as `node` user (included).
