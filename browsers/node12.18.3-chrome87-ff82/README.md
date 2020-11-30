# cypress/browsers:node12.18.3-chrome87-ff82

A complete image with all operating system dependencies for Cypress, Chrome
87 and Firefox 82 browsers.

[Dockerfile](Dockerfile)

```text
node version:    v12.18.3
npm version:     6.14.8
yarn version:    1.22.4
debian version:  10.5
Chrome version:  Google Chrome 87.0.4280.66
Firefox version: Mozilla Firefox 82.0
git version:     git version 2.20.1
whoami:          root
```

**Note:** this image uses the `root` user. You might want to switch to non-root
user like `node` when running this container for security.
