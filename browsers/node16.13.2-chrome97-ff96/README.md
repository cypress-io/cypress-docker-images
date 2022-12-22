# cypress/browsers:node16.13.2-chrome97-ff96

A complete image with all operating system dependencies for Cypress, Chrome
97 and Firefox 96 browsers.

[Dockerfile](Dockerfile)

```text
 node version:    v16.13.2 
 npm version:     8.1.2 
 yarn version:    1.22.17 
 debian version:  10.11 
 Chrome version:  Google Chrome 97.0.4692.71  
 Firefox version: Mozilla Firefox 96.0.2 
 git version:     git version 2.20.1 
 whoami:          root
```

**Note:** this image uses the `root` user. You might want to switch to non-root
user like `node` when running this container for security.
