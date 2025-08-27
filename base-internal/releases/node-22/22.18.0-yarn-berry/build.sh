#!/bin/bash
set e+x

# build image with Cypress dependencies
LOCAL_NAME=cypress/base-internal:22.18.0-yarn-berry

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME . --platform linux/amd64
