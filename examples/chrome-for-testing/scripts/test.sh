#!/bin/bash
set -e # fail on error
#
# Test building and running custom Cypress Docker image with different
# versions of Chrome for Testing
#
# Run ./scripts/test.sh in directory examples/chrome-for-testing
#
ARCHITECTURE=$(uname -m)
echo Running on "$ARCHITECTURE"

case $ARCHITECTURE in
  x86_64)
    echo Testing Chrome for Testing in amd64
    platformFilename=chrome-linux64
    ;;
  aarch64)
    echo Testing Chrome for Testing in arm64
    platformFilename=chrome-linux-arm64
    ;;
  *)
    echo Unsupported architecture
    exit 1
    ;;
esac

npm ci # Install dependencies
# uncomment lines below to test different versions of Chrome for Testing
# See https://googlechromelabs.github.io/chrome-for-testing/ for current versions
chromeVersion=(
    'stable'
    # 'beta'
    # 'dev'
    # 'canary'
    # '153'
    # '153.0.8010.36'
    )
# Build, show Cypress info and run Cypress test
for i in "${!chromeVersion[@]}"; do
echo
echo CHROME_VERSION "${chromeVersion[$i]}"
docker build --build-arg CHROME_VERSION="${chromeVersion[$i]}" --build-arg PLATFORM_FILENAME=${platformFilename} -t test-chrome-for-testing .
docker run --rm --entrypoint bash test-chrome-for-testing -c "npx cypress info"
docker run --rm --entrypoint bash test-chrome-for-testing -c "npx cypress run --browser chrome-for-testing"
done
