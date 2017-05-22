> Docker image with Cypress dependencies

If you want to install and run Cypress.io inside your Docker container,
we have prepared an image with Node, XVFB and other
[Cypress dependencies][cy deps].
Just run your Docker image from `cypress/base` and you should be good to go!

[cy deps]: https://docs.cypress.io/docs/continuous-integration#section-dependencies

Example user Dockerfile

```
FROM cypress/base
RUN npm install -g cypress
RUN cypress install
RUN cypress --run ...
```

## Other images

We have a few other *strictly internal* images built from this repo. These
images are used to test Cypress tools on CI. For example, we have an image
based on `cypress/base` with Chrome browser installed.

```sh
$ docker run cypress/internal:chrome58 chrome --version
Google Chrome 58.0.3029.110
```
