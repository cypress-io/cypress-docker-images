# cypress/included:3.8.1

Read [Run Cypress with a single Docker command](https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/)

## Run tests

```shell
$ docker run -it -v $PWD:/e2e -w /e2e cypress/included:3.8.1
# runs Cypress tests from the current folder
```
