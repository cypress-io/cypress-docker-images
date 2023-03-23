# Change log

## 2.1.0

* Updated default node version from `18.14.1` to `18.15.0`. Addressed in [#866](https://github.com/cypress-io/cypress-docker-images/pull/866)

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
