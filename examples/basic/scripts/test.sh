#!/bin/bash
set -e # fail on error
#
# Run ./scripts/test.sh in examples/basic directory
#
ARCHITECTURE=$(uname -m)
echo Running on $ARCHITECTURE

echo Test basic example
npm ci # Install dependencies
echo Build and test with cypress/base in Electron
docker build -f Dockerfile.base -t test-base  . # Build a new image
docker run --rm --entrypoint bash test-base -c "npx cypress run" # Run Cypress test in container

case $ARCHITECTURE in
  x86_64)
    echo Testing browsers in amd64
    echo Build and test with cypress/browsers in Chrome
      docker build -f Dockerfile.browsers -t test-browsers . # Build a new image
      docker run --rm --entrypoint bash test-browsers -c "npx cypress run -b chrome" # Run Cypress test in container using Chrome
    ;;
  aarch64)
    echo Skipping browser tests for arm64
    echo No browsers available
    ;;
  *)
    echo Unsupported architecture
    exit 1
    ;;
esac
