#!/bin/bash

set -e

docker build -t cypress/base-internal:22.15.1-yarn-berry --platform linux/amd64 .
docker push cypress/base-internal:22.15.1-yarn-berry 