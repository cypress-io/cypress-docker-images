# cypress/browsers:node12.16.1-chrome80-ff73

A complete image with all operating system dependencies for Cypress, Chrome
80 and Firefox 73 browsers.

[Dockerfile](Dockerfile)

```text
node version:    v12.16.1
npm version:     6.14.1
yarn version:    1.22.0
debian version:  9.11
Chrome version:  Google Chrome 80
Firefox version: Mozilla Firefox 73.0.1
git version:     git version 2.11.0
```

**Note:** this image uses the `root` user. You might want to switch to non-root
user like `node` when running this container for security.
