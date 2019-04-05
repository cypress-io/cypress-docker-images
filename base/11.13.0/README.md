# cypress/base:11.13.0

Size

```
$ docker images --format "{{.Tag}} {{.Size}}" cypress/base:11.13.0
11.13.0 969MB
```

## Example

Sample Dockerfile

```
FROM cypress/base:11.13.0
RUN npm install --save-dev cypress
RUN $(npm bin)/cypress verify
RUN $(npm bin)/cypress run
```
