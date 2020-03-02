# cypress/browsers:node10.16.3-chrome80-ff73

A complete image with all operating system dependencies for Cypress, Chrome, and Firefox

[Dockerfile](Dockerfile)

```text
node version:    v10.16.3
npm version:     6.14.1
yarn version:    1.22.0
debian version:  10.1
Chrome version:  Google Chrome 80.0.3987.116
Firefox version: Mozilla Firefox 73.0.1
git version:     git version 2.20.1
whoami:          root
```

**Note:** this image uses the `root` user. You might want to switch to non-root
user like `node` when running this container for security.
