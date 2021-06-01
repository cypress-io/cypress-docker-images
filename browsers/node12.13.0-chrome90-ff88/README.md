# cypress/browsers:node12.13.0-chrome90-ff88

A complete image with all operating system dependencies for Cypress, Chrome
89 and Firefox 86 browsers.

[Dockerfile](Dockerfile)

```text
node version:    v12.13.0 
npm version:     7.6.0 
yarn version:    1.22.10 
debian version:  10.8 
Chrome version:  Google Chrome 90.0.4430.212  
Firefox version: Mozilla Firefox 88.0.1 
git version:     git version 2.20.1 
whoami:          root 
```

**Note:** this image uses the `root` user. You might want to switch to non-root
user like `node` when running this container for security.
