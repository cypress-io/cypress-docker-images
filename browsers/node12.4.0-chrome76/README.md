# cypress/browsers:node12.4.0-chrome76

A complete image with all operating system dependencies for Cypress and Chrome 76 browser

[Dockerfile](Dockerfile)

## Example

If you want to build your image

```
FROM cypress/browsers:node12.4.0-chrome76
RUN npm i cypress
RUN $(npm bin)/cypress run --browser chrome
```

This image uses the `root` user. You might want to switch to non-root
user when running this container for security.
