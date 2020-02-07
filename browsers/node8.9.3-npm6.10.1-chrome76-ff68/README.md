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

## Versions

```
node version:    v8.9.3
npm version:     6.10.1
yarn version:    1.17.3
debian version:  8.10
Chrome version:  Google Chrome 76.0.3809.100
Firefox version: Mozilla Firefox 68.0.2
git version:     git version 2.1.4
```
