#!/bin/bash

set -e

docker build -t cypress/browsers-internal:node22.15.1-bullseye-chrome136-ff138-edge --platform linux/amd64 .
docker push cypress/browsers-internal:node22.15.1-bullseye-chrome136-ff138-edge 