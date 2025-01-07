#!/bin/bash
set -e # fail on error
#
# Run in examples/basic directory
# (amd64 only)
#
echo Test basic example
npm ci                    # Install dependencies
echo Build and test with cypress/base in Electron
docker build -f Dockerfile.base -t test-base  . # Build a new image
docker run --rm --entrypoint bash test-base -c "npx cypress run" # Run Cypress test in container
echo Build and test with cypress/browsers in Chrome
docker build -f Dockerfile.browsers -t test-browsers . # Build a new image
docker run --rm --entrypoint bash test-browsers -c "npx cypress run -b chrome" # Run Cypress test in container using Chrome
