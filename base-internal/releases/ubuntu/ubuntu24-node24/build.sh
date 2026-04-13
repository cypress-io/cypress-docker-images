#!/bin/bash
set -e

docker build -t cypress/base-internal:ubuntu24-node24 .
