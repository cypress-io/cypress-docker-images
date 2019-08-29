# cypress/browsers:node8.9.3-npm6.10.1-chrome76-ff68

A complete image with:
- all operating system dependencies for Cypress
- Chrome 76 browser
- Firefox 68 browser

[Dockerfile](Dockerfile)

## Example

If you want to build your image

```
FROM cypress/browsers:node8.9.3-npm6.10.1-chrome76-ff68
RUN npm i cypress
RUN $(npm bin)/cypress run --browser chrome
```

This image uses the `root` user. You might want to switch to non-root
user when running this container for security.
