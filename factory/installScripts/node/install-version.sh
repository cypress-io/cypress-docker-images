#! /bin/bash

echo "NODE_VERSION: $1"

if [[ -z $1 ]]
then
  echo "A Node version must be defined"
  exit 1
fi

# The following code could be enabled for a node version check but since this docker factory supports multiple versions of cypress
# we probably should not enforce a minimum since it may change. I'm leaving this code since version checking is hard and maybe we
# will change our minds in the future.
# MaximumUnsupportedVersion='16.15.1'
# printf -v versions '%s\n%s' "$1" "$MaximumUnsupportedVersion"
# if [[ $versions = "$(sort -V <<< "$versions")" ]]; then
#     echo 'Node version mus be 16.16.0 or higher'
#     exit 1
# else
#     echo 'SUCCESS'
# fi

# Add logic here to choose a different install script if a future node version requires different setps
bash "$(dirname "$0")/default.sh" $1
