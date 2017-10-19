# Docker hub notes

Internal tags on Docker hub:
[cypress/internal/tags](https://hub.docker.com/r/cypress/internal/tags/)

For increased security the `cypress/internal` images create separate non-root
user called `person`.

## Building Docker Hub

1. Open Docker hub build settings page, for example
  [cypress/internal](https://hub.docker.com/r/cypress/internal/~/settings/automated-builds/)
2. Click "Trigger" button next to the tag you would like to build

![Trigger buttons](screenshots/docker-hub-build.png)

Then look at "Build Details" tab to see the build progress, usually takes a
few minutes to finish.
