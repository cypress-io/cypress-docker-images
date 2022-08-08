# cypress/base

[![Docker Pulls](https://img.shields.io/docker/pulls/cypress/base.svg?maxAge=604800)](https://hub.docker.com/r/cypress/base/)

> Docker images that include all operating system dependencies necessary to run Cypress, **but NOT Cypress itself** and no pre-installed browsers. See [cypress/included](../included) images if you need Cypress pre-installed in the image. See [cypress/browsers](../browsers) images if you need some browsers pre-installed in the image.

Each tag is in a sub folder, named after Node version or OS it is built on.

Image `cypress/base:12` is tagged [`latest`](https://hub.docker.com/r/cypress/base/tags/)

> **Note** All Base Images install the latest versions of NPM & Yarn.
 
 | Name + Tag                        | Node    | Operating System | Link                                         | NPM version | Yarn version | Notes       |
| --------------------------------- | ------- | ---------------- | -------------------------------------------- | ----------- | ------------ | ----------- |
| cypress/base:6                    | 6       | Debian           | [/6](6)                                      | 3.10.10     | 1.6.0        |
| cypress/base:8                    | 8       | Debian           | [/8](8)                                      | 6.4.1       | 1.9.4        |
| cypress/base:8.0.0                | 8.0.0   | Debian           | [/8.0.0](8.0.0)                              | 6.14.1      | 1.22.0       |
| cypress/base:8.2.1                | 8.2.1   | Debian           | [/8.2.1](8.2.1)                              | 5.3.0       | 1.12.3       |
| cypress/base:8.9.3                | 8.9.3   | Debian           | [/8.9.3](8.9.3)                              | 5.5.1       | 1.12.3       |
| cypress/base:8.9.3-npm-6.10.1     | 8.9.3   | Debian           | [/8.9.3](8.9.3-npm-6.10.1)                   | 6.10.1      | 1.17.3       |
| cypress/base:8.15.1               | 8.15.1  | Debian           | [/8.15.1](8.15.1)                            | 6.9.0       | 1.15.2       |
| cypress/base:8.16.0               | 8.16.0  | Debian           | [/8.16.0](8.16.0)                            | 6.9.0       | 1.16.0       | [1](#note1) |
| cypress/base:10.0.0               | 10.0.0  | Debian 8.10      | [/10.0.0](10.0.0)                            | 6.14.5      | 1.22.4       | [1](#note1) |
| cypress/base:10                   | 10.13   | Debian           | [/10](10)                                    | 6.4.1       | 1.9.4        |
| cypress/base:10.2.1               | 10.2.1  | Debian           | [/10.2.1](10.2.1)                            | 6.9.0       | 1.16.0       | [1](#note1) |
| cypress/base:10.11.0              | 10.11.0 | Debian           | [/10.11.0](10.11.0)                          | 6.9.0       | 1.16.0       | [1](#note1) |
| cypress/base:10.15.3              | 10.15.3 | Debian           | [/10.15.3](10.15.3)                          | 6.9.0       | 1.15.2       |
| cypress/base:10.16.0              | 10.16.0 | Debian           | [/10.16.0](10.16.0)                          | 6.9.0       | 1.16.0       |
| cypress/base:10.16.3              | 10.16.3 | Debian           | [/10.16.3](10.16.3)                          | 6.14.1      | 1.22.0       |
| cypress/base:10.18.0              | 10.18.0 | Debian           | [/10.18.0](10.18.0)                          | 6.13.4      | 1.21.1       |
| cypress/base:10.22.0              | 10.22.0 | Debian 10.5      | [/10.22.0](10.22.0)                          | 6.14.8      | 1.22.4       |
| cypress/base:11.13.0              | 11.13.0 | Debian           | [/11.13.0](11.13.0)                          | 6.9.0       | 1.15.2       |
| cypress/base:12.0.0               | 12.0.0  | Debian           | [/12.0.0](12.0.0)                            | 6.10.0      | 1.16.0       | [1](#note1) |
| cypress/base:12.0.0-libgbm        | 12.0.0  | Debian 9.8       | [/12.0.0-libgbm](12.0.0-libgbm)              | 6.9.0       | 1.15.2       | [1](#note1) |
| cypress/base:12.1.0               | 12.1.0  | Debian           | [/12.1.0](12.1.0)                            | 6.9.0       | 1.15.2       |
| cypress/base:12.4.0               | 12.4.0  | Debian           | [/12.4.0](12.4.0)                            | 6.10.2      | 1.17.3       | [1](#note1) |
| cypress/base:12.6.0               | 12.6.0  | Debian           | [/12.6.0](12.6.0)                            | 6.10.0      | 1.16.0       | [1](#note1) |
| cypress/base:12.8.1               | 12.8.1  | Debian           | [/12.8.1](12.8.1)                            | 6.13.7      | 1.22.0       | [1](#note1) |
| cypress/base:12.12.0              | 12.12.0 | Debian           | [/12.12.0](12.12.0)                          | 6.12.0      | 1.19.1       | [1](#note1) |
| cypress/base:12.13.0              | 12.13.0 | Debian           | [/12.13.0](12.13.0)                          | 6.13.0      | 1.19.1       | [1](#note1) |
| cypress/base:12.14.0              | 12.14.0 | Debian           | [/12.14.0](12.14.0)                          | 6.13.4      | 1.21.1       | [1](#note1) |
| cypress/base:12.14.1              | 12.14.1 | Debian           | [/12.14.1](12.14.1)                          | 6.14.5      | 1.22.4       | [1](#note1) |
| cypress/base:12.16.0              | 12.16.0 | Debian           | [/12.16.0](12.16.0)                          | 6.13.7      | 1.22.0       | [1](#note1) |
| cypress/base:12.16.1              | 12.16.1 | Debian           | [/12.16.1](12.16.1)                          | 6.14.1      | 1.22.0       | [1](#note1) |
| cypress/base:12.16.2              | 12.16.2 | Debian           | [/12.16.2](12.16.2)                          | 6.14.5      | 1.22.4       | [1](#note1) |
| cypress/base:12.18.0              | 12.18.0 | Debian           | [/12.18.0](12.18.0)                          | 6.14.4      | 1.22.4       | [1](#note1) |
| cypress/base:12.18.2              | 12.18.2 | Debian 10.4      | [/12.18.2](12.18.2)                          | 6.14.7      | 1.22.4       | [1](#note1) |
| cypress/base:12.18.3              | 12.18.3 | Debian 10.5      | [/12.18.3](12.18.3)                          | 6.14.8      | 1.22.4       | [1](#note1) |
| cypress/base:12.18.4              | 12.18.4 | Debian 10.5      | [/12.18.4](12.18.4)                          | 6.14.8      | 1.22.10      | [1](#note1) |
| cypress/base:12.19.0              | 12.19.0 | Debian 10.6      | [/12.19.0](12.19.0)                          | 6.14.8      | 1.22.10      | [1](#note1) |
| cypress/base:12.22.8              | 12.22.8 | Debian 10.11     | [/12.22.8](12.22.8)                          | 6.14.15     | 1.22.17      | [1](#note1) |
| cypress/base:13.1.0               | 13.1.0  | Debian           | [/13.1.0](13.1.0)                            | 6.13.1      | 1.19.1       | [1](#note1) |
| cypress/base:13.3.0               | 13.3.0  | Debian           | [/13.3.0](13.3.0)                            | 6.13.4      | 1.21.1       | [1](#note1) |
| cypress/base:13.6.0               | 13.6.0  | Debian 10.2      | [/13.6.0](13.6.0)                            | 6.13.6      | 1.21.1       | [1](#note1) |
| cypress/base:13.6.0               | 13.8.0  | Debian 10.2      | [/13.8.0](13.8.0)                            | 6.13.6      | 1.21.1       | [1](#note1) |
| cypress/base:14.0.0               | 14.0.0  | Debian 10.3      | [/14.0.0](14.0.0)                            | 6.14.4      | 1.22.4       | [1](#note1) |
| cypress/base:14.5.0               | 14.5.0  | Debian 10.4      | [/14.5.0](14.5.0)                            | 6.14.7      | 1.22.4       | [1](#note1) |
| cypress/base:14.7.0               | 14.7.0  | Debian 10.5      | [/14.7.0](14.7.0)                            | 6.14.7      | 1.22.4       | [1](#note1) |
| cypress/base:14.10.1              | 14.10.1 | Debian 10.5      | [/14.10.1](14.10.1)                          | 6.14.8      | 1.22.5       | [1](#note1) |
| cypress/base:14.15.0              | 14.15.0 | Debian 10.5      | [/14.15.0](14.15.0)                          | 6.14.8      | 1.22.10      | [1](#note1) |
| cypress/base:14.15.4              | 14.15.4 | Debian 10.5      | [/14.15.4](14.15.4)                          | 6.14.11     | 1.22.10      | [1](#note1) |
| cypress/base:14.16.0              | 14.16.0 | Debian 10.8      | [/14.16.0](14.16.0)                          | 7.6.0       | 1.22.10      | [1](#note1) |
| cypress/base:14.17.0              | 14.17.0 | Debian 10.9      | [/14.17.0](14.17.0)                          | 6.14.13     | 1.22.10      | [1](#note1) |
| cypress/base:14.17.3              | 14.17.3 | Debian 10.10     | [/14.17.3](14.17.3)                          | 6.14.13     | 1.22.10      | [1](#note1) |
| cypress/base:14.18.1              | 14.18.1 | Debian 10.10     | [/14.18.1](14.18.1)                          | 6.14.15     | 1.22.15      | [1](#note1) |
| cypress/base:16.0.0               | 16.0.0  | Debian 10.9      | [/16.0.0](16.0.0)                            | 7.10.0      | 1.22.10      | [1](#note1) |
| cypress/base:16.1.0               | 16.1.0  | Debian 10.9      | [/16.1.0](16.1.0)                            | 7.10.0      | 1.22.10      | [1](#note1) |
| cypress/base:16.2.0               | 16.2.0  | Debian 10.9      | [/16.2.0](16.2.0)                            | 7.10.0      | 1.22.10      | [1](#note1) |
| cypress/base:16.3.0               | 16.3.0  | Debian 10.9      | [/16.3.0](16.3.0)                            | 7.10.0      | 1.22.10      | [1](#note1) |
| cypress/base:16.4.0               | 16.4.0  | Debian 10.9      | [/16.4.0](16.4.0)                            | 7.10.0      | 1.22.10      | [1](#note1) |
| cypress/base:16.5.0               | 16.5.0  | Debian 10.9      | [/16.5.0](16.5.0)                            | 7.10.0      | 1.22.10      | [1](#note1) |
| cypress/base:16.13.0              | 16.13.0 | Debian 10.9      | [/16.13.0](16.13.0)                          | 7.10.0      | 1.22.10      | [1](#note1) |
| cypress/base:16.14.0              | 16.14.0 | Debian 10.11     | [/16.14.0](16.14.0)                          | 8.3.1       | 1.22.17      | [1](#note1) |
| cypress/base:17.3.0               | 17.3.0  | Debian 10.9      | [/17.3.0](17.3.0)                            | 8.3.0       | 1.22.17      | [1](#note1) |
| cypress/base:centos7              | 6       | CentOS           | [/centos7](centos7)                          | 3.10.10     | 🚫           |
| cypress/base:centos7-12.4.0       | 12.4.0  | CentOS           | [/centos7](centos7)                          | 6.9.0       | 1.16.0       |
| cypress/base:ubuntu16             | 6       | Ubuntu           | [/ubuntu16](ubuntu16)                        | 3.10.10     | 🚫           |
| cypress/base:ubuntu16-8           | 8.16.2  | Ubuntu           | [/ubuntu16-8](ubuntu16-8)                    | 6.4.1       | 🚫           |
| cypress/base:ubuntu16-12.13.1     | 12.13.1 | Ubuntu           | [/ubuntu16-12.13.1](ubuntu16-12.13.1)        | 6.12.1      | 🚫           |
| cypress/base:ubuntu18-node12.14.1 | 12.14.1 | Ubuntu 18.04.3   | [ubuntu18-node12.14.1](ubuntu18-node12.14.1) | 6.13.6      | 1.21.1       |
| cypress/base:ubuntu19-node12.14.1 | 12.14.1 | Ubuntu 19.0.4    | [ubuntu19-node12.14.1](ubuntu19-node12.14.1) | 6.13.6      | 1.21.1       |
| cypress/base:manjaro-node14.12.0  | 14.12.0 | Manjaro          | [manjaro-14.12.0](manjaro-14.12.0)           | 6.14.8      | 1.22.10      | 
| cypress/base:14.19.0              | 14.19.0 | Debian           | [/14.19.0](14.19.0)                          | 6.14.16     | 1.22.17      |
| cypress/base:16.14.0-slim | 16.14.0 | Debian | [/16.14.0](16.14.0) | `🚫` | `🚫` | `🚫` |
| cypress/base:17.8.0 | 17.8.0 | Debian | [/17.8.0](17.8.0) | `🚫` | `🚫` | `🚫` |
| cypress/base:14.17.6 | 14.17.6 | Debian | [/14.17.6](14.17.6) | `🚫` | `🚫` | `🚫` |
| cypress/base:16.14.2 | 16.14.2 | Debian | [/16.14.2](16.14.2) | `🚫` | `🚫` | `🚫` |
| cypress/base:16.14.2-slim | 16.14.2 | Debian | [/16.14.2](16.14.2) | `🚫` | `🚫` | `🚫` |
| cypress/base:14.17.6-slim | 14.17.6 | Debian | [/14.17.6](14.17.6) | `🚫` | `🚫` | `🚫` |
| cypress/base:16.16.0 | 16.16.0 | Debian 11 | [/16.16.0](16.16.0) | 8.11.0 | 1.22.19 | [1](#note1) |
 
## ⚠️ Node.js Support

Cypress 4.0+ no longer supports Node.js versions below 8.0.0. See our [Migration Guide](https://on.cypress.io/migration-guide#Node-js-8-support).

Using 6.x images is not recommended, and we do not plan to release new versions of Cypress tested on Node.js below 8.0.0.

## Information

Node release schedule at [nodejs/Release](https://github.com/nodejs/Release) and one can find LTS versions using [nvm](https://github.com/creationix/nvm) tool

```text
nvm ls-remote | grep LTS
...
  v8.16.1   (LTS: Carbon)
  v8.16.2   (LTS: Carbon)
  v8.17.0   (Latest LTS: Carbon)
...
  v10.18.0   (LTS: Dubnium)
  v10.18.1   (LTS: Dubnium)
  v10.19.0   (Latest LTS: Dubnium)
...
  v12.14.1   (LTS: Erbium)
  v12.15.0   (LTS: Erbium)
  v12.16.0   (Latest LTS: Erbium)
```

## Notes

<div id="note1">

**1:** this image includes fonts with Chinese characters
