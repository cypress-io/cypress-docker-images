# cypress/base:11.13.0

Size

```
$ docker images cypress/base:11.13.0
REPOSITORY          TAG                 IMAGE ID            SIZE
cypress/base        11.13.0             ae05bb9eae5f        969MB
```

## Example

Sample Dockerfile

```
FROM cypress/base:11.13.0
RUN npm install --save-dev cypress
RUN $(npm bin)/cypress verify
RUN $(npm bin)/cypress run
```
