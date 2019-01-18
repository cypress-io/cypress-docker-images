# cypress/base

Main images that include all dependencies necessary to run Cypress.
Each tag is in a sub folder, named after Node version or OS it is built on.

Image `cypress/base:8` is tagged [`latest`](https://hub.docker.com/r/cypress/base/tags/)

Name + Tag | Node | Operating System | Link | NPM version | Yarn version
--- | --- | --- | --- | --- | ---
cypress/base:6 | 6.16.0 | Debian 9.6 | [/6](6) | 3.10.10 | 1.12.3
cypress/base:8 | 8.15.0 | Debian 9.6 | [/8](8) | 6.6.0 | 1.12.3
cypress/base:10 | 10.15.0 | Debian 9.6 | [/10](10) | 6.6.0 | 1.12.3
cypress/base:centos7 | 6 | CentOS | [/centos7](centos7) | 3.10.10 | 🚫
cypress/base:ubuntu16 | 6 | Ubuntu | [/ubuntu16](ubuntu16) | 3.10.10 | 🚫

**note** Cypress no longer supports Node v0.12.x and 4.x [End-of-Life Releases](https://github.com/nodejs/Release#end-of-life-releases)
