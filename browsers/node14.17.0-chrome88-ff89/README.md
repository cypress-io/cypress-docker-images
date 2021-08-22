# cypress/browsers:node14.17.0-chrome88-ff89

A complete image with all operating system dependencies for Cypress, Chrome
88 and Firefox 89 browsers.

[Dockerfile](Dockerfile)

```text
node version:    v14.17.0
npm version:     6.14.13
yarn version:    1.22.10
debian version:  10.9
Chrome version:  Google Chrome 88.0.4324.96 
Firefox version: Mozilla Firefox 89.0.2
git version:     git version 2.20.1
whoami:          root
```

**Note:** this image uses the `root` user. You might want to switch to non-root
user like `node` when running this container for security.
