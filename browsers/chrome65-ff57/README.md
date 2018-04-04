# cypress/browsers:chrome65-ff57

A complete image with all dependencies for Cypress included browsers Chrome, Firefox

[Dockerfile](Dockerfile)

## Example

If you want to build your image

```
FROM cypress/browsers:chrome65-ff57
RUN npm i cypress
RUN firefox --version
RUN $(npm bin)/cypress run --browser chrome
RUN $(npm bin)/cypress run --browser firefox
```

This image uses the `root` user. You might want to switch to non-root
user when running this container for security.
