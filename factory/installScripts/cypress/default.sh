#! /bin/bash
set -e

# TODO: should TypeScript be versioned? Should it have its own ARG for the factory?
# TypeScript is installed to allow testing of .ts spec files.
npm install -g "cypress@${1}" typescript

# Loosen file privileges for the Cypress cache. The first time that Cypress runs, it will create a
# binary_state.json file if it hasn't already been created. This was causing issues with non-root
# users who do not have access to write to this directory. Since this is a develompent Docker image
# and to lower barriers as much as possible, we are loosening privs to allow the binary_state.json file
# to be created. Previously this file was created by root when cypress verify was called, but this would
# apply to amd processors since cypress verify was not called on arm processors.
chmod -R 777 /root/.cache
