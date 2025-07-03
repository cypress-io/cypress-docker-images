# Ubuntu 24.04 with Node.js 22.15.1

This is a base image for Cypress that includes:

- Ubuntu 24.04
- Node.js 22.15.1
- Latest NPM
- Latest Yarn
- Git
- Python 3.11 (for node-gyp)
- All Cypress dependencies

## Usage

```bash
docker pull cypress/base-internal:ubuntu24-node22
```

## Build

```bash
./build.sh
```
