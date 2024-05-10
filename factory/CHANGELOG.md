# Change log

## 3.5.5

* Updated default node version from `20.12.2` to `20.13.0`. Addressed in [#1045](https://github.com/cypress-io/cypress-docker-images/pull/1045)

## 3.5.4

* Updated default node version from `20.12.0` to `20.12.2`. Addressed in [#1032](https://github.com/cypress-io/cypress-docker-images/pull/1032)

## 3.5.3

* Updated default node version from `20.11.1` to `20.12.0`. Addressed in [#1029](https://github.com/cypress-io/cypress-docker-images/pull/1029)

## 3.5.2

* Updated default node version from `20.11.0` to `20.11.1`. Addressed in [#1025](https://github.com/cypress-io/cypress-docker-images/pull/1025)

## 3.5.1

* Added `unzip` to factory. Addressed in [#1015](https://github.com/cypress-io/cypress-docker-images/pull/1015)

## 3.5.0

* Updated default node version from `20.10.0` to `20.11.0`. Addressed in [#1012](https://github.com/cypress-io/cypress-docker-images/pull/1012)

## 3.4.0

* Updated default node version from `20.9.0` to `20.10.0`. Addressed in [#999](https://github.com/cypress-io/cypress-docker-images/pull/999)

## 3.3.0

* **Fixed:** Issue with temporary file cleanup due to extra character in temp Debian package file path. Addressed in [#998](https://github.com/cypress-io/cypress-docker-images/pull/998)

## 3.2.0

* Updated default node version from `20.8.1` to `20.9.0`. Addressed in [#987](https://github.com/cypress-io/cypress-docker-images/pull/987)
* Updated default node version from `20.6.1` to `20.8.1`. Addressed in [#951](https://github.com/cypress-io/cypress-docker-images/pull/951)

## 3.1.0

* Updated default node version from `20.5.0` to `20.6.1`. Addressed in [#936](https://github.com/cypress-io/cypress-docker-images/pull/936)

## 3.0.0

* Updated default node version from `18.16.1` to `20.5.0`. Addressed in [#920](https://github.com/cypress-io/cypress-docker-images/pull/920)

* Added `openssl` and `ca-certificates` to factory. Addressed in [#920](https://github.com/cypress-io/cypress-docker-images/pull/920)

## 2.4.0

* Updated default node version from `18.16.0` to `18.16.1`. Addressed in [#906](https://github.com/cypress-io/cypress-docker-images/pull/906)

## 2.3.0

* Updated default node version from `18.15.0` to `18.16.0`. Addressed in [#881](https://github.com/cypress-io/cypress-docker-images/pull/881)

## 2.2.0

* Install ssh client to enable git cloning via ssh without falling back to CI's native git client. Addressed in [#880](https://github.com/cypress-io/cypress-docker-images/pull/880)

## 2.1.0

* Updated default node version from `18.14.1` to `18.15.0`. Addressed in [#866](https://github.com/cypress-io/cypress-docker-images/pull/866)

## 2.0.3

* Updated browser install scripts to explicitly check for supported platforms instead of subset of unsupported platforms. Addressed in [#875](https://github.com/cypress-io/cypress-docker-images/pull/875)

## 2.0.2

* Git was accidentally removed. Addressed in [#874](https://github.com/cypress-io/cypress-docker-images/pull/874)

## 2.0.1

* Removed the curl dependency to remove critical vulnerability. Addressed in [#855](https://github.com/cypress-io/cypress-docker-images/pull/855)

## 2.0.0

* Updated default node version from `16.18.1` to `18.14.1`. Addressed in [#843](https://github.com/cypress-io/cypress-docker-images/pull/843)

## 1.0.4

* Loosened file permissions to allow non root users to create files in the Cypress cache. Fixed in [#839](https://github.com/cypress-io/cypress-docker-images/pull/839)

## 1.0.3

* Added the curl dependency to the finished image. Addressed in [#834](https://github.com/cypress-io/cypress-docker-images/pull/834)

## 1.0.2

* Fixed issue where the `ps` command was not included in the image. Fixed in [#819](https://github.com/cypress-io/cypress-docker-images/pull/819)

## 1.0.1

* Fixed issue where setting the `NODE_VERSION` arg value in the dockerfile would not override the default node version. Fixed in [#818](https://github.com/cypress-io/cypress-docker-images/pull/818)

## 1.0.0

* Initial Release of [cypress/factory](https://hub.docker.com/repository/docker/cypress/factory/general#)
