# cypress/browsers:node14.13.1-chrome84

A complete image with all operating system dependencies for Cypress, Chrome 84.

[Dockerfile](Dockerfile)

```text
 node version:    v14.13.1
 npm version:     6.14.8
 yarn version:    1.22.10
 debian version:  10.6
 Chrome version:  Google Chrome 86.0.4240.75
 git version:     git version 2.20.1
```

**Note:** this image uses the `root` user. You might want to switch to non-root
user like `node` when running this container for security.
