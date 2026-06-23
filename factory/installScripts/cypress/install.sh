#! /bin/bash
set -e

# Highest major version of TypeScript that Cypress supports
# See https://docs.cypress.io/app/tooling/typescript-support#Install-TypeScript
TYPESCRIPT_VERSION=6

if [[ -z "$1" ]]; then
  echo 'No Cypress version provided, skipping Cypress install'
  exit 0
fi

npm install -g "cypress@$1" --ignore-scripts
cypress install

# Loosen file privileges for the Cypress cache. The first time that Cypress runs, it will create a
# binary_state.json file, if it hasn't already been created. This was causing issues with non-root
# users who do not have access to write to this directory. Since this is a development Docker container
# and to lower barriers as much as possible, privileges are loosened to allow the binary_state.json file
# to be created. Previously this file was created by root when 'cypress verify' was called, but this would
# apply to amd processors since 'cypress verify' was not called on arm processors.
chmod -R 777 /root/.cache

# TODO: Should TypeScript have its own ARG for the factory?
# TypeScript is installed to allow testing of .ts spec files.
npm install -g "typescript@$TYPESCRIPT_VERSION"
echo "Installed TypeScript $(tsc --version)"
