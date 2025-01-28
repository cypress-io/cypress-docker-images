#!/bin/bash
set -e # fail on error
#
# Test all examples
# Run ./test-all-examples.sh in examples directory
#
# These examples are compatible with amd64 architecture
namedExamplesAmd64=(
    'basic'
    'basic-mini'
    'chrome-for-testing'
    'chromium'
    'firefox-esr'
    'included-as-non-root'
    )

# These examples are compatible with arm64 architecture
namedExamplesArm64=(
    'basic'
    'basic-mini'
#    'chrome-for-testing' # not available for arm64
    'chromium'
    'firefox-esr'
    'included-as-non-root'
    )

if [ "$(uname -m)" = "x86_64" ]; then
    echo Testing examples for amd64
    for i in ${!namedExamplesAmd64[@]}; do
    echo
    echo testing examples/${namedExamplesAmd64[$i]} directory
    cd ${namedExamplesAmd64[$i]}
    ./scripts/test.sh
    cd ..
    done
else
    echo Testing examples for arm64
    for i in ${!namedExamplesArm64[@]}; do
    echo
    echo testing examples/${namedExamplesArm64[$i]} directory
    cd ${namedExamplesArm64[$i]}
    ./scripts/test.sh
    cd ..
    done
fi
