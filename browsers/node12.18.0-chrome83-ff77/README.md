# cypress/browsers:node12.18.0-chrome83-ff77

A complete image with all operating system dependencies for Cypress, Chrome
81 and Firefox 75 browsers.

[Dockerfile](Dockerfile)

```text
node version:    v12.18.0
npm version:     6.14.4
yarn version:    1.22.4
debian version:  10.1
Chrome version:  Google Chrome 83.0.4103.61
Firefox version: Mozilla Firefox 77.0
git version:     git version 2.20.1
```

**Note:** this image uses the `root` user. You might want to switch to non-root
user like `node` when running this container for security.
