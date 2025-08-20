#! /bin/bash
set -e
# TODO: should typescript be versioned? Should it have it's own ARG for the factory?
# Typescript is installed to allow testing of .ts spec files.
if [[ -n "$1" ]]; then
  npm install -g https://cdn.cypress.io/beta/npm/15.0.0/linux-x64/develop-f6e0744e38f6b86af49ea3b036bedbe45a672008/cypress.tgz typescript

  # Loosen file priveleges for the cypress cache. The first time that cypress runs it will create a
  # binary_state.json file if it hasn't already been created. This was causing issues with non-root
  # users, they do not have access to write to this directory. Since this is a develompent docker container
  # and to lower barriers as much as possible, we are loosening privs to allow the binary_state.json file
  # to be created. Previously this file was created by root when cypress verify was called, but this would
  # apply to amd processors since cypress verify was not called on arm processors.
  chmod -R 777 /root/.cache
else
  echo 'No Cypress version provided; skipping install.'
fi
