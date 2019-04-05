# cypress/browsers:node11.13.0-chrome73

A complete image with all operating system dependencies for Cypress and Chrome 73 browser

[Dockerfile](Dockerfile)

Size

```bash
$ docker images --format "{{.Tag}} {{.Size}}" cypress/browsers:node11.13.0-chrome73
node11.13.0-chrome73 1.28GB
```

## Example

If you want to build your image

```
FROM cypress/browsers:node11.13.0-chrome73
RUN npm i cypress
RUN $(npm bin)/cypress run --browser chrome
```

This image uses the `root` user. You might want to switch to non-root
user when running this container for security.
