# cypress/browsers:node12.20.0-slim-chrome86

A complete image with all operating system dependencies for Cypress and Chrome 86.

[Dockerfile](Dockerfile)

```text
node version:    v12.20.0
npm version:     6.14.9
yarn version:    1.22.10
debian version:  10.6
Chrome version:  Google Chrome 86.0.4240.193
git version:     git version 2.20.1
whoami:          root
```

**Note:** this image uses the `root` user. You might want to switch to non-root
user like `node` when running this container for security.
