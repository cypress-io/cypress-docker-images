#!/bin/bash

set -e

LOCAL_NAME=cypress/browsers-internal:node20.19.1-chrome132-ff138
echo "Building $LOCAL_NAME"

docker build -t $LOCAL_NAME --platform linux/amd64 . 