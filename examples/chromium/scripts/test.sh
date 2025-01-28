#!/bin/bash
set -e # fail on error
#
# Run ./scripts/test.sh in examples/chromium directory
#
ARCHITECTURE=$(uname -m)
echo Running on $ARCHITECTURE

case $ARCHITECTURE in
  x86_64)
    echo Testing Chromium browser in amd64
    ;;
  aarch64)
    echo Testing Chromium browser in arm64
    ;;
  *)
    echo Unsupported architecture
    exit 1
    ;;
esac

echo Test Chromium in cypress/base
npm ci # Install dependencies
docker build -t test-chromium . # Build a new image
docker run --rm --entrypoint bash test-chromium -c "npx cypress run --browser chromium" # Run Cypress test using Chromium
