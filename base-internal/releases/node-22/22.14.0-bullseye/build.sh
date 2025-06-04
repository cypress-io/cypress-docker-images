#!/bin/bash

set -e

docker build -t cypress/base-internal:22.14.0-bullseye --platform linux/amd64 . 