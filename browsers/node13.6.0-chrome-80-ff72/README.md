# cypress/browsers:node13.6.0-chrome-80-ff72

A complete image with all operating system dependencies for Cypress, Chrome, and Firefox

[Dockerfile](Dockerfile)

```text
node version:    v13.6.0
npm version:     6.13.6
yarn version:    1.21.1
debian version:  10.2
Chrome version:  Google Chrome 80.0.3987.87
Firefox version: Mozilla Firefox 72.0.2
git version:     git version 2.20.1
```

**Note:** this image uses the `root` user. You might want to switch to non-root
user like `node` when running this container for security.
