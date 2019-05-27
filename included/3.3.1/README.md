# cypress/included:3.3.1

Read [Run Cypress with a single Docker command](https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/)

```shell
$ docker run -it -v $PWD:/e2e -w /e2e --entrypoint cypress cypress/included:3.3.1 --version
Cypress package version: 3.3.1
Cypress binary version: 3.3.1
```
