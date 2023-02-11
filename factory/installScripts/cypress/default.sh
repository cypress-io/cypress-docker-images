#! /bin/bash

# TODO: should typescript be versioned? Should it have it's own ARG for the factory?
# Typescript is installed to allow testing of .ts spec files.
npm install -g "cypress@${1}" typescript

# Run cypress verify to create the binary_state.json file. The node user
# has access to read /root/.cache/Cypress/<version>/binary_state.json but
# not to write it
cypress verify
