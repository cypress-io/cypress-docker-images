#! /bin/bash

echo "NODE_VERSION: $1"

# Add logic here to choose a different install script if a future node version requires different setps
bash "$(dirname "$0")/default.sh" $1
