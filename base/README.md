# cypress/base

[![Docker Pulls](https://img.shields.io/docker/pulls/cypress/base.svg?maxAge=604800)](https://hub.docker.com/r/cypress/base/)

Main images that include all operating system dependencies necessary to run Cypress, **but NOT the test runner itself**. See [cypress/included](../included) images if you need pre-installed Cypress in the image.

Each tag is in a sub folder, named after Node version or OS it is built on.

Image `cypress/base:8` is tagged [`latest`](https://hub.docker.com/r/cypress/base/tags/)

Name + Tag | Node | Operating System | Link | NPM version | Yarn version | Notes
--- | --- | --- | --- | --- | --- | ---
cypress/base:6 | 6 | Debian | [/6](6) | 3.10.10 | 1.6.0
cypress/base:8 | 8 | Debian | [/8](8) | 6.4.1 | 1.9.4
cypress/base:8.2.1 | 8.2.1 | Debian | [/8.2.1](8.2.1) | 5.3.0 | 1.12.3
cypress/base:8.9.3 | 8.9.3 | Debian | [/8.9.3](8.9.3) | 5.5.1 | 1.12.3
cypress/base:8.9.3-npm-6.10.1 | 8.9.3 | Debian | [/8.9.3](8.9.3-npm-6.10.1) | 6.10.1 | 1.17.3
cypress/base:8.15.1 | 8.15.1 | Debian | [/8.15.1](8.15.1) | 6.9.0 | 1.15.2
cypress/base:8.16.0 | 8.16.0 | Debian | [/8.16.0](8.16.0) | 6.9.0 | 1.16.0 | [1](#note1)
cypress/base:10 | 10 | Debian | [/10](10) | 6.4.1 | 1.9.4
cypress/base:10.2.1 | 10.2.1 | Debian | [/10.2.1](10.2.1) | 6.9.0 | 1.16.0 | [1](#note1)
cypress/base:10.11.0 | 10.11.0 | Debian | [/10.11.0](10.11.0) | 6.9.0 | 1.16.0 | [1](#note1)
cypress/base:10.15.3 | 10.15.3 | Debian | [/10.15.3](10.15.3) | 6.9.0 | 1.15.2
cypress/base:10.16.0 | 10.16.0 | Debian | [/10.16.0](10.16.0) | 6.9.0 | 1.16.0
cypress/base:10.18.0 | 10.18.0 | Debian | [/10.18.0](10.18.0) | 6.13.4 | 1.21.1
cypress/base:11.13.0 | 11.13.0 | Debian | [/11.13.0](11.13.0) | 6.9.0 | 1.15.2
cypress/base:12.0.0 | 12.0.0 | Debian | [/12.0.0](12.0.0) | 6.10.0 | 1.16.0 | [1](#note1)
cypress/base:12.1.0 | 12.1.0 | Debian | [/12.1.0](12.1.0) | 6.9.0 | 1.15.2
cypress/base:12.4.0 | 12.4.0 | Debian | [/12.4.0](12.4.0) | 6.10.2 | 1.17.3 | [1](#note1)
cypress/base:12.6.0 | 12.6.0 | Debian | [/12.6.0](12.6.0) | 6.10.0 | 1.16.0 | [1](#note1)
cypress/base:12.12.0 | 12.12.0 | Debian | [/12.12.0](12.12.0) | 6.12.0 | 1.19.1 | [1](#note1)
cypress/base:12.13.0 | 12.13.0 | Debian | [/12.13.0](12.13.0) | 6.13.0 | 1.19.1 | [1](#note1)
cypress/base:12.14.0 | 12.14.0 | Debian | [/12.14.0](12.14.0) | 6.13.4 | 1.21.1 | [1](#note1)
cypress/base:13.1.0 | 13.1.0 | Debian | [/13.1.0](13.1.0) | 6.13.1 | 1.19.1 | [1](#note1)
cypress/base:13.3.0 | 13.3.0 | Debian | [/13.3.0](13.3.0) | 6.13.4 | 1.21.1 | [1](#note1)
cypress/base:centos7 | 6 | CentOS | [/centos7](centos7) | 3.10.10 | 🚫
cypress/base:centos7-12.4.0 | 12.4.0 | CentOS | [/centos7](centos7) | 6.9.0 | 1.16.0
cypress/base:ubuntu16 | 6 | Ubuntu | [/ubuntu16](ubuntu16) | 3.10.10 | 🚫
cypress/base:ubuntu16-8 | 8.16.2 | Ubuntu | [/ubuntu16-8.16.2](ubuntu16-8.16.2) | 6.4.1 | 🚫
cypress/base:ubuntu16-12.13.1 | 12.13.1 | Ubuntu | [/ubuntu16-12.13.1](ubuntu16-12.13.1) | 6.12.1 | 🚫

⚠️ Cypress no longer supports Node v0.12.x. Using 4.x, 6.x images is not recommended, and we do not plan to release new versions of Cypress tested on Node v4. See [End-of-Life Releases](https://github.com/nodejs/Release#end-of-life-releases).

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

## Notes

<div id="note1">

**1:** image `cypress/base:8.16.0` includes fonts with Chinese characters
