# cypress/browsers:chrome71

A complete image with all dependencies for Cypress included browsers Chrome 71

[Dockerfile](Dockerfile)
```
 node version:           v10.15.0
 npm version:            6.4.1
 yarn version:           1.12.3
 google-chrome version:  Google Chrome 71.0.3578.98
 zip version:            This is Zip 3.0 (July 5th 2008), by Info-ZIP.
 git version:            git version 2.11.0
 debian version:         9.6
```


## Example

If you want to build your image

```
FROM cypress/browsers:chrome71
RUN npm i cypress
RUN $(npm bin)/cypress run --browser chrome
```

This image uses the `root` user. You might want to switch to non-root
user when running this container for security.
