#! /bin/bash

# Chrome offers a debian package, I wasn't able to add the package list due to signing issues so isntead we downlaod the specific deb for the requested version, then 'fix' the package by installing missing dependencies.
wget --no-verbose -O /usr/src/google-chrome-stable_current_amd64.deb http://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${1}_amd64.deb \
  && dpkg -i /usr/src/google-chrome-stable_current_amd64.deb ;

# install any missing dependancies
apt-get install -f -y
# remove temp download
rm -f /usr/src/google-chrome-stable_current_amd64.deb
