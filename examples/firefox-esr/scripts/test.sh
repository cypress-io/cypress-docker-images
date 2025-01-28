#!/bin/bash
set -e # fail on error
#
# Run ./scripts/test.sh in examples/firefox-esr directory
#
ARCHITECTURE=$(uname -m)
echo Running on $ARCHITECTURE

case $ARCHITECTURE in
  x86_64)
    echo Testing Firefox ESR browser in amd64
    ;;
  aarch64)
    echo Testing Firefox ESR browser in arm64
    ;;
  *)
    echo Unsupported architecture
    exit 1
    ;;
esac

echo Test Firefox ESR in cypress/base
npm ci # Install dependencies
docker build -t test-firefox-esr . # Build a new image
docker run --rm --entrypoint bash test-firefox-esr -c "npx cypress run --browser firefox" # Run Cypress test using Firefox ESR
