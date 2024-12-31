#!/bin/bash
set -e # fail on error
#
# Test all examples
# Run in examples directory
#
# These examples are compatible with amd64 architecture
namedExamplesAmd64=(
    'basic'
    'basic-mini'
    'chromium'
    'firefox-esr'
    'included-as-non-root'
    )

# These examples are compatible with arm64 architecture
namedExamplesArm64=(
    'chromium'
    'firefox-esr'
    )

if [ "$(uname -m)" = "x86_64" ]; then
    echo Testing all examples
    for i in ${!namedExamplesAmd64[@]}; do
    echo
    echo testing examples/${namedExamplesAmd64[$i]} directory
    cd ${namedExamplesAmd64[$i]}
    ./scripts/test.sh
    cd ..
    done
else
    echo Testing examples for arm64 only
    for i in ${!namedExamplesArm64[@]}; do
    echo
    echo testing examples/${namedExamplesArm64[$i]} directory
    cd ${namedExamplesArm64[$i]}
    ./scripts/test.sh
    cd ..
    done
fi
