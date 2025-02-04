#!/bin/bash
set -e # fail on error
#
# Run ./scripts/test.sh in examples/included-as-non-root directory
#
ARCHITECTURE=$(uname -m)
echo Running on $ARCHITECTURE

case $ARCHITECTURE in
  x86_64)
    echo Testing in amd64
    ;;
  aarch64)
    echo Testing in arm64
    ;;
  *)
    echo Unsupported architecture
    exit 1
    ;;
esac

echo Test cypress/included running under node \(non-root\) user
docker run --rm -v .:/test -w /test -u node cypress/included
