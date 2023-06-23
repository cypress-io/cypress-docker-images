# Change log

## 2.4.0

* Updated default node version from `18.16.0` to `20.3.1`. Addressed in [#905](https://github.com/cypress-io/cypress-docker-images/pull/905)

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
