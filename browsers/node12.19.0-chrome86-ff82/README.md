# cypress/browsers:node12.18.3-chrome83-ff77

A complete image with all operating system dependencies for Cypress, Chrome
86 and Firefox 82 browsers.

[Dockerfile](Dockerfile)

```text
node version:    v12.19.0
npm version:     6.14.8
yarn version:    1.22.10
debian version:  10.6
Chrome version:  Google Chrome 86.0.4240.193
Firefox version: Mozilla Firefox 82.0.3
git version:     git version 2.20.1
```

**Note:** this image uses the `root` user. You might want to switch to non-root
user like `node` when running this container for security.
