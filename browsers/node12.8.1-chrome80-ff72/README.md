# cypress/browsers:node12.8.1-chrome80-ff72

A complete image with all operating system dependencies for Cypress, Chrome, and Firefox

[Dockerfile](Dockerfile)

```text
node version:    v12.8.1
npm version:     6.13.7
yarn version:    1.22.0
debian version:  10.0
Chrome version:  Google Chrome 80.0.3987.87
Firefox version: Mozilla Firefox 72.0.2
git version:     git version 2.20.1
whoami:          root
```

**Note:** this image uses the `root` user. You might want to switch to non-root
user like `node` when running this container for security.
