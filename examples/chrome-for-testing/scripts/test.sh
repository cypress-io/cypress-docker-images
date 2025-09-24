#!/bin/bash
set -e # fail on error
#
# Test building and running custom Cypress Docker image with different
# versions of Chrome for Testing
#
# Run ./scripts/test.sh in directory examples/chrome-for-testing
#
ARCHITECTURE=$(uname -m)
echo Running on $ARCHITECTURE

case $ARCHITECTURE in
  x86_64)
    echo Testing Chrome for Testing in amd64
    npm ci # Install dependencies
    #
    chromeVersion=(
        'stable'
        'beta'
        'dev'
        'canary'
        '140'
        '140.0.7339.185'
        )
    # Build, show Cypress info and run Cypress test
    for i in ${!chromeVersion[@]}; do
    echo
    echo CHROME_VERSION ${chromeVersion[$i]}
    docker build --build-arg CHROME_VERSION=${chromeVersion[$i]} -t test-chrome-for-testing .
    docker run --rm --entrypoint bash test-chrome-for-testing -c "npx cypress info"
    docker run --rm --entrypoint bash test-chrome-for-testing -c "npx cypress run --browser chrome-for-testing"
    done
    ;;
  aarch64)
    echo Skipping Chrome for Testing for arm64
    echo This browser is not available for Linux/arm64
    ;;
  *)
    echo Unsupported architecture
    exit 1
    ;;
esac
