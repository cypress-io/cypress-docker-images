#! /bin/bash

# TODO: should typescript be versioned? Should it have it's own ARG for the factory?
# Typescript is installed to allow testing of .ts spec files.
npm install -g "cypress@${1}" typescript

chmod -R 777 /root/.cache
