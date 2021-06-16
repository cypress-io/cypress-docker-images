# cypress/browsers:node16.1.0-chrome91-ff89

A complete image with all operating system dependencies for Cypress, Chrome
91 and Firefox 89 browsers.

[Dockerfile](Dockerfile)

```text
node version:    v16.1.0
npm version:     7.10.0
yarn version:    1.22.10
debian version:  10.9
Chrome version:  Google Chrome 91.0.4472.106
Firefox version: Mozilla Firefox 89.0.1
git version:     git version 2.20.1
whoami:          root
```

**Note:** this image uses the `root` user. You might want to switch to non-root
user like `node` when running this container for security.
