#!/bin/bash

set -e

docker build -t cypress/browsers-internal:node22.15.1-chrome136-ff138 --platform linux/amd64 .
docker push cypress/browsers-internal:node22.15.1-chrome136-ff138 