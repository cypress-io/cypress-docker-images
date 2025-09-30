#!/bin/bash

set -e+x

# build image with Cypress dependencies
LOCAL_NAME=cypress/base-internal:22.19.0-bullseye

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME . --platform linux/amd64
