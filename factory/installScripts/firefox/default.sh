#! /bin/bash

# Firefox does not have a debian package that is kept up to date, so instead we install deps directly and download the tar to unzip.
#
# $1: version (example: 136.0)
# $2: compression (xz or bz2)
# $3: platform (linux-x86_64 or linux-aarch64)

apt-get update \
  && apt-get install -y \
    libxtst6 \
    libgtk-3-0 \
    libdbus-glib-1-2 \
    mplayer \
    xz-utils \
  && wget --no-verbose -O /tmp/firefox.tar.${2} https://download-installer.cdn.mozilla.net/pub/firefox/releases/${1}/${3}/en-US/firefox-${1}.tar.${2} \
  && tar -C /opt -xaf /tmp/firefox.tar.${2} \
  && rm /tmp/firefox.tar.${2} \
  && ln -fs /opt/firefox/firefox /usr/bin/firefox \
