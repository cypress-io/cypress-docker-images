# cypress/browsers:node12.14.1-chrome85-ff81

A complete image with all operating system dependencies for Cypress, plus Chrome and Firefox browsers.

[Dockerfile](Dockerfile)

```
 node version:    v12.14.1
 npm version:     6.14.5
 yarn version:    1.22.4
 debian version:  10.2
 Chrome version:  Google Chrome 85.0.4183.121
 Firefox version: Mozilla Firefox 81.0
 git version:     git version 2.20.1
 whoami:          root
```

**Note:** this image uses the `root` user. You might want to switch to non-root
user like `node` when running this container for security.
