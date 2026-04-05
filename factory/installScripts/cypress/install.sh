#! /bin/bash
set -e
# TODO: Should typescript have its own ARG for the factory?
# Typescript is installed to allow testing of .ts spec files.
if [[ -n "$1" ]]; then
  npm install -g "cypress@$1" typescript@5
  echo "Installed TypeScript $(tsc --version)"

  # Loosen file privileges for the cypress cache. The first time that cypress runs it will create a
  # binary_state.json file if it hasn't already been created. This was causing issues with non-root
  # users who do not have access to write to this directory. Since this is a development docker container
  # and to lower barriers as much as possible, we are loosening privileges to allow the binary_state.json file
  # to be created. Previously this file was created by root when cypress verify was called, but this would
  # apply to amd processors since cypress verify was not called on arm processors.
  chmod -R 777 /root/.cache
else
  echo 'No Cypress version provided, skipping Cypress install'
fi
