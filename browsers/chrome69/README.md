# cypress/browsers:chrome69

A complete image with all dependencies for Cypress included browsers Chrome 69

[Dockerfile](Dockerfile)

## Example

If you want to build your image

```
FROM cypress/browsers:chrome69
RUN npm i cypress
RUN $(npm bin)/cypress run --browser chrome
```

This image uses the `root` user. You might want to switch to non-root
user when running this container for security.
