#! /bin/bash

# Chrome offers a debian package, download the specific debian package and install it with apt-get to also install dependencies.
wget --no-verbose -O /usr/src/google-chrome-stable_current_amd64.deb http://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${1}_amd64.deb

apt-get update
apt-get install -f -y /usr/src/google-chrome-stable_current_amd64.deb

# remove temp download
rm -f /usr/src/google-chrome-stable_current_amd64.debd
