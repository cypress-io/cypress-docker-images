# cypress/base

Main images that include all operating system dependencies necessary to run Cypress, **but NOT the test runner itself**.

Each tag is in a sub folder, named after Node version or OS it is built on.

Image `cypress/base:8` is tagged [`latest`](https://hub.docker.com/r/cypress/base/tags/)

Name + Tag | Node | Operating System | Link | NPM version | Yarn version
--- | --- | --- | --- | --- | ---
cypress/base:6 | 6 | Debian | [/6](6) | 3.10.10 | 1.6.0
cypress/base:8 | 8 | Debian | [/8](8) | 6.4.1 | 1.9.4
cypress/base:8.2.1 | 8.2.1 | Debian | [/8.2.1](8.2.1) | 5.3.0 | 1.12.3
cypress/base:8.15.1 | 8.15.1 | Debian | [/8.15.1](8.15.1) | 6.9.0 | 1.15.2
cypress/base:10 | 10 | Debian | [/10](10) | 6.4.1 | 1.9.4
cypress/base:10.15.3 | 10.15.3 | Debian | [/10.15.3](10.15.3) | 6.9.0 | 1.15.2
cypress/base:11.13.0 | 11.13.0 | Debian | [/11.13.0](11.13.0) | 6.9.0 | 1.15.2
cypress/base:centos7 | 6 | CentOS | [/centos7](centos7) | 3.10.10 | 🚫
cypress/base:ubuntu16 | 6 | Ubuntu | [/ubuntu16](ubuntu16) | 3.10.10 | 🚫

**note** Cypress no longer supports Node v0.12.x and 4.x [End-of-Life Releases](https://github.com/nodejs/Release#end-of-life-releases)

## Information

Node release schedule at [nodejs/Release](https://github.com/nodejs/Release) and one can find LTS versions using [nvm](https://github.com/creationix/nvm) tool

```text
nvm ls-remote
...
  v8.14.1   (LTS: Carbon)
  v8.15.0   (LTS: Carbon)
  v8.15.1   (Latest LTS: Carbon)
...
  v10.15.1   (LTS: Dubnium)
  v10.15.2   (LTS: Dubnium)
  v10.15.3   (Latest LTS: Dubnium)
```
