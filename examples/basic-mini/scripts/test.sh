#!/bin/bash
set -e # fail on error
#
# Run in examples/basic-mini directory
# (amd64 only)
#
echo Test base-mini with cypress/included in Chrome
docker run --rm -v .:/app -w /app --entrypoint cypress cypress/included run -b chrome
