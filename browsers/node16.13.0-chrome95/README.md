# cypress/browsers:node16.13.0-chrome95

A complete image with all operating system dependencies for Cypress, Chrome
95 browser.

[Dockerfile](Dockerfile)

```text
 node version:    v16.13.0
 npm version:     7.19.1
 yarn version:    1.22.15
 debian version:  10.10
 Chrome version:  Google Chrome 95.0.4638.69
 git version:     git version 2.20.1 
 whoami:          root 
```

**Note:** this image uses the `root` user. You might want to switch to non-root
user like `node` when running this container for security.
