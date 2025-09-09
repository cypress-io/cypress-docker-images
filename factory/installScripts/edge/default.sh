#! /bin/bash

# Microsoft offers a debian package, here we're adding the package list and then installing the specific version we want to install.
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg \
  && install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d \
  && sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge.list' \
  && rm microsoft.gpg \
  && apt-get update \
  && apt-get install -y microsoft-edge-stable=${1} \
  && ln -s /usr/bin/microsoft-edge /usr/bin/edge
