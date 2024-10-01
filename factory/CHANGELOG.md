# Change log

## 4.2.2

- Updated default node version from `20.17.0` to `20.18.0`. Addresses [#1217](https://github.com/cypress-io/cypress-docker-images/issues/1217) for `cypress/base`, `cypress/browsers` and `cypress/included`.

## 4.2.1

- Rebuilt factory with latest Debian `12.x` fixes. This removes the [CVE-2024-32002](https://nvd.nist.gov/vuln/detail/CVE-2024-32002), [CVE-2024-45490](https://nvd.nist.gov/vuln/detail/CVE-2024-45490), [CVE-2024-45491](https://nvd.nist.gov/vuln/detail/CVE-2024-45491) and [CVE-2024-45492](https://nvd.nist.gov/vuln/detail/CVE-2024-45492) vulnerabilities being reported in security scans. Addresses [#1217](https://github.com/cypress-io/cypress-docker-images/issues/1217) for `cypress/factory`.

## 4.2.0

- Updated Debian base to `debian:12.7-slim` using [Debian 12.7](https://www.debian.org/News/2024/20240831), released on Aug 31, 2024. Addresses [#1207](https://github.com/cypress-io/cypress-docker-images/issues/1207)

## 4.1.1

- Updated default node version from `20.16.0` to `20.17.0`. Addressed in [#1201](https://github.com/cypress-io/cypress-docker-images/pull/1201)

## 4.1.0

- Adds [zstd](https://packages.debian.org/stable/utils/zstd) (fast lossless compression algorithm -- CLI tool) to images. Addresses [#584](https://github.com/cypress-io/cypress-docker-images/issues/584)

## 4.0.6

- Reinstates empty directory structure `/usr/share/man` which was previously removed as part of factory build process. Addresses [#1184](https://github.com/cypress-io/cypress-docker-images/issues/1184)

## 4.0.5

- Updated default node version from `20.15.1` to `20.16.0`. Addressed in [#1182](https://github.com/cypress-io/cypress-docker-images/pull/1182)

## 4.0.4

- Updated default node version from `20.14.0` to `20.15.1`. Addresses [#1153](https://github.com/cypress-io/cypress-docker-images/issues/1153)

## 4.0.3

- Updated Debian base to `debian:12.6-slim` using [Debian 12.6](https://www.debian.org/News/2024/20240629), released June 29th, 2024. Addresses [#1137](https://github.com/cypress-io/cypress-docker-images/issues/1137)

## 4.0.2

- Updated default node version from `20.13.1` to `20.14.0`. Addressed in [#1097](https://github.com/cypress-io/cypress-docker-images/pull/1097)

## 4.0.1

- Removed obsolete environment variable `npm_config_unsafe_perm`, not used or needed in npm `v7` and later. Addressed in [#1078](https://github.com/cypress-io/cypress-docker-images/pull/1078)

## 4.0.0

- Updated Debian base image to `debian:12-slim` (codename `bookworm`). Addressed in [#1057](https://github.com/cypress-io/cypress-docker-images/pull/1057)

## 3.5.7

- Updated Yarn (v1 Classic) version from `1.22.19` to `1.22.22`. Addressed in [#1071](https://github.com/cypress-io/cypress-docker-images/pull/1071)

## 3.5.6

- Updated default node version from `20.13.0` to `20.13.1`. Addressed in [#1059](https://github.com/cypress-io/cypress-docker-images/pull/1059)

## 3.5.5

- Updated default node version from `20.12.2` to `20.13.0`. Addressed in [#1045](https://github.com/cypress-io/cypress-docker-images/pull/1045)

## 3.5.4

- Updated default node version from `20.12.0` to `20.12.2`. Addressed in [#1032](https://github.com/cypress-io/cypress-docker-images/pull/1032)

## 3.5.3

- Updated default node version from `20.11.1` to `20.12.0`. Addressed in [#1029](https://github.com/cypress-io/cypress-docker-images/pull/1029)

## 3.5.2

- Updated default node version from `20.11.0` to `20.11.1`. Addressed in [#1025](https://github.com/cypress-io/cypress-docker-images/pull/1025)

## 3.5.1

- Added `unzip` to factory. Addressed in [#1015](https://github.com/cypress-io/cypress-docker-images/pull/1015)

## 3.5.0

- Updated default node version from `20.10.0` to `20.11.0`. Addressed in [#1012](https://github.com/cypress-io/cypress-docker-images/pull/1012)

## 3.4.0

- Updated default node version from `20.9.0` to `20.10.0`. Addressed in [#999](https://github.com/cypress-io/cypress-docker-images/pull/999)

## 3.3.0

- **Fixed:** Issue with temporary file cleanup due to extra character in temp Debian package file path. Addressed in [#998](https://github.com/cypress-io/cypress-docker-images/pull/998)

## 3.2.0

- Updated default node version from `20.8.1` to `20.9.0`. Addressed in [#987](https://github.com/cypress-io/cypress-docker-images/pull/987)
- Updated default node version from `20.6.1` to `20.8.1`. Addressed in [#951](https://github.com/cypress-io/cypress-docker-images/pull/951)

## 3.1.0

- Updated default node version from `20.5.0` to `20.6.1`. Addressed in [#936](https://github.com/cypress-io/cypress-docker-images/pull/936)

## 3.0.0

- Updated default node version from `18.16.1` to `20.5.0`. Addressed in [#920](https://github.com/cypress-io/cypress-docker-images/pull/920)

- Added `openssl` and `ca-certificates` to factory. Addressed in [#920](https://github.com/cypress-io/cypress-docker-images/pull/920)

## 2.4.0

- Updated default node version from `18.16.0` to `18.16.1`. Addressed in [#906](https://github.com/cypress-io/cypress-docker-images/pull/906)

## 2.3.0

- Updated default node version from `18.15.0` to `18.16.0`. Addressed in [#881](https://github.com/cypress-io/cypress-docker-images/pull/881)

## 2.2.0

- Install ssh client to enable git cloning via ssh without falling back to CI's native git client. Addressed in [#880](https://github.com/cypress-io/cypress-docker-images/pull/880)

## 2.1.0

- Updated default node version from `18.14.1` to `18.15.0`. Addressed in [#866](https://github.com/cypress-io/cypress-docker-images/pull/866)

## 2.0.3

- Updated browser install scripts to explicitly check for supported platforms instead of subset of unsupported platforms. Addressed in [#875](https://github.com/cypress-io/cypress-docker-images/pull/875)

## 2.0.2

- Git was accidentally removed. Addressed in [#874](https://github.com/cypress-io/cypress-docker-images/pull/874)

## 2.0.1

- Removed the curl dependency to remove critical vulnerability. Addressed in [#855](https://github.com/cypress-io/cypress-docker-images/pull/855)

## 2.0.0

- Updated default node version from `16.18.1` to `18.14.1`. Addressed in [#843](https://github.com/cypress-io/cypress-docker-images/pull/843)

## 1.0.4

- Loosened file permissions to allow non root users to create files in the Cypress cache. Fixed in [#839](https://github.com/cypress-io/cypress-docker-images/pull/839)

## 1.0.3

- Added the curl dependency to the finished image. Addressed in [#834](https://github.com/cypress-io/cypress-docker-images/pull/834)

## 1.0.2

- Fixed issue where the `ps` command was not included in the image. Fixed in [#819](https://github.com/cypress-io/cypress-docker-images/pull/819)

## 1.0.1

- Fixed issue where setting the `NODE_VERSION` arg value in the dockerfile would not override the default node version. Fixed in [#818](https://github.com/cypress-io/cypress-docker-images/pull/818)

## 1.0.0

- Initial Release of [cypress/factory](https://hub.docker.com/repository/docker/cypress/factory/general#)
