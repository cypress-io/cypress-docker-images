#!/bin/bash
set -e # fail on error
#
# Test building and running custom Cypress Docker image with different
# versions of Chrome for Testing
# Run in directory examples/chrome-for-testing
# (amd64 only)
#
npm ci # Install dependencies
#
chromeVersion=(
    'stable'
    'beta'
    'dev'
    'canary'
    '130'
    '131.0.6778.204'
    )
# Build, show Cypress info and run Cypress test
for i in ${!chromeVersion[@]}; do
echo
echo CHROME_VERSION ${chromeVersion[$i]}
docker build --build-arg CHROME_VERSION=${chromeVersion[$i]} -t test-chrome-for-testing .
docker run --rm --entrypoint bash test-chrome-for-testing -c "npx cypress info"
docker run --rm --entrypoint bash test-chrome-for-testing -c "npx cypress run --browser chrome-for-testing"
done
