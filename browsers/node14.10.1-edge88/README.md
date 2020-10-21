# cypress/browsers:node14.10.1-edge88

A complete image with all operating system dependencies for Cypress and [Microsoft Edge browser](https://www.microsoftedgeinsider.com/en-us/download/?platform=linux-deb).

[Dockerfile](Dockerfile)

```text
node versions:   v14.10.1
npm version:     6.14.8
yarn version:    1.22.5
Debian version:  10.5
Edge version:    Microsoft Edge 88.0.673.0 dev
git version:     git version 2.20.1
whoami:          root
```

**Note:** this image uses the `root` user. You might want to switch to non-root
user like `node` when running this container for security.
