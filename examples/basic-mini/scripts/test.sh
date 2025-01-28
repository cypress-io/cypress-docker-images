#!/bin/bash
set -e # fail on error
#
# Run ./scripts/test.sh in examples/basic-mini directory
#
ARCHITECTURE=$(uname -m)
echo Running on $ARCHITECTURE

echo Test basic-mini example

case $ARCHITECTURE in
  x86_64)
    echo Testing cypress/included in amd64 using Chrome
      docker run --rm -v .:/app -w /app --entrypoint cypress cypress/included run -b chrome
    ;;
  aarch64)
    echo Testing cypress/included in arm64 using Electron
    echo No other browsers available
      docker run --rm -v .:/app -w /app cypress/included
    ;;
  *)
    echo Unsupported architecture
    exit 1
    ;;
esac
