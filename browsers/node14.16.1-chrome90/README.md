# cypress/browsers:node14.16.1-chrome90

A complete image with all operating system dependencies for Cypress, Chrome 89.

[Dockerfile](Dockerfile)

```text
node version:    v14.16.1
npm version:     6.14.12
yarn version:    1.22.10
debian version:  10.8
Chrome version:  Google Chrome 90.0.4430.93
git version:     git version 2.20.1
whoami:          root
```

**Note:** this image uses the `root` user. You might want to switch to non-root
user like `node` when running this container for security.
