# cypress/browsers:node8.2.1-chrome73

A complete image with all operating system dependencies for Cypress and Chrome 73 browser

[Dockerfile](Dockerfile)

Note: this image is mostly used for internal building and testing of Cypress test runner v3.3.x

## Example

If you want to build your image

```
FROM cypress/browsers:node8.2.1-chrome73
RUN npm i cypress
RUN $(npm bin)/cypress run --browser chrome
```

This image uses the `root` user. You might want to switch to non-root
user when running this container for security.
