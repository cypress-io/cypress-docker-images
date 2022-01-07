# cypress/browsers:node14.15.0-chrome96-ff94

A complete image with all operating system dependencies for Cypress, Chrome
96 and Firefox 94 browsers.

[Dockerfile](Dockerfile)

```text
node version:    v14.15.0
npm version:     6.14.8
yarn version:    1.22.10
debian version:  10.6
Chrome version:  Google Chrome 96.0.4664.45
Firefox version: Mozilla Firefox 94.0.2
git version:     git version 2.20.1
```

**Note:** this image uses the `root` user. You might want to switch to non-root
user like `node` when running this container for security.
