# cypress/base-internal:24.14.0-glibc-2.31

A Docker image with Cypress dependencies pre-installed, based on **Ubuntu 20.04 LTS** (glibc 2.31), **Node.js 24.14.0**, **GCC 11** (from `ppa:ubuntu-toolchain-r/test`), and **Python 3.8** (the distro default on Focal).

NOTE: This image is intended for internal use with https://github.com/cypress-io/cypress. It contains a few differences from the factory, such as:

#### Dependency additions

- xauth (to run xvfb inside system-tests)
- build-essential, plus GCC 11 as the default `gcc` / `g++` via `update-alternatives`
- On **amd64** only: `gcc-11-multilib` / `g++-11-multilib` (the toolchain PPA does not publish these for arm64)
- Python 3.8 from Ubuntu (no separate source build; Focal ships 3.8)

#### Env variables

- Does not contain the `CACHE_FOLDER` and `FACTORY_DEFAULT_NODE_VERSION` env variables to keep unit tests non environment specific

## Usage

```bash
docker pull cypress/base-internal:24.14.0-glibc-2.31
```

## Build

```bash
./build.sh
```
