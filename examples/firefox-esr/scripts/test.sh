#!/bin/bash
set -e # fail on error
#
# Run in examples/firefox-esr directory
#
echo Test Firefox ESR in cypress/base
npm ci                              # Install dependencies
docker build -t test-firefox-esr .  # Build a new image
docker run --rm --entrypoint bash test-firefox-esr -c "npx cypress run --browser firefox" # Run Cypress test using Firefox ESR
