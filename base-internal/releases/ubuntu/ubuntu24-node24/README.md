# Ubuntu 24.04 with Node.js 24.14.1

This is a base image for Cypress that includes:

- Ubuntu 24.04
- Node.js 24.14.1
- Python 3.11 (for `node-gyp`)
- Latest NPM
- Latest Yarn
- Git
- All Cypress dependencies

## Usage

```bash
docker pull cypress/base-internal:ubuntu24-node24
```

## Build

```bash
./build.sh
```
