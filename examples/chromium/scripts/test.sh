#!/bin/bash
set -e # fail on error
#
# Run in examples/chromium directory
#
echo Test Chromium in cypress/base
npm ci                           # Install dependencies
docker build -t test-chromium .  # Build a new image
docker run --rm --entrypoint bash test-chromium -c "npx cypress run --browser chromium" # Run Cypress test using Chromium
