# cypress/browsers:node12.13.0-chrome80-ff74

A complete image with all operating system dependencies for Cypress, Chrome, and Firefox

[Dockerfile](Dockerfile)

```text
node version:    v12.13.0
npm version:     6.14.2
yarn version:    1.22.4
debian version:  10.1
Chrome version:  Google Chrome 80.0.3987.116
Firefox version: Mozilla Firefox 74.0
git version:     git version 2.20.1
whoami:          root
```

**Note:** this image uses the `root` user. You might want to switch to non-root
user like `node` when running this container for security.
