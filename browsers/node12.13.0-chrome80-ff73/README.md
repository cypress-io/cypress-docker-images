# cypress/browsers:node12.13.0-chrome80-ff73

A complete image with all operating system dependencies for Cypress, Chrome, and Firefox

[Dockerfile](Dockerfile)

```text
node version:    v12.13.0
npm version:     6.13.0
yarn version:    1.19.1
debian version:  9.11
Chrome version:  Google Chrome 80.0.3987.116
Firefox version: Mozilla Firefox 73.0.1
git version:     git version 2.11.0
whoami:          root
```

**Note:** this image uses the `root` user. You might want to switch to non-root
user like `node` when running this container for security.
