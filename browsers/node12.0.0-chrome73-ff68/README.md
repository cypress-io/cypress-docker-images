# cypress/browsers:node12.0.0-chrome73-ff68

A complete image with all operating system dependencies for Cypress, Chrome 73, and Firefox 68

[Dockerfile](Dockerfile)

## Versions

```
node version:    v12.0.0
npm version:     6.10.3
yarn version:    1.17.3
debian version:  9.8
Chrome version:  Google Chrome 73.0.3683.103
Firefox version: Firefox 68.0.2
git version:     git version 2.11.0
```

## Size

```bash
$ docker images --format "{{.Tag}} {{.Size}}" cypress/browsers:node12.0.0-chrome73-ff68
node12.0.0-chrome73-ff68 1.39GB
```

## Example

If you want to build your image

```
FROM cypress/browsers:node12.0.0-chrome73-ff68
RUN npm i cypress
RUN $(npm bin)/cypress run --browser chrome
```

This image uses the `root` user. You might want to switch to non-root
user when running this container for security.
