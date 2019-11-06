# cypress/browsers:node12.13.0-chrome78-ff70

A complete image with all operating system dependencies for Cypress and Chrome 77 browser

[Dockerfile](Dockerfile)

```text
node version:    v12.13.0
npm version:     6.13.0
yarn version:    1.19.1
debian version:  9.11
Chrome version:  Google Chrome 78.0.3904.97
Firefox version: Mozilla Firefox 70.0.1
git version:     git version 2.11.0
```

**Note:** this image uses the `root` user. You might want to switch to non-root
user like `node` when running this container for security.
