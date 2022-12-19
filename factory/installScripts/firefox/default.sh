#! /bin/bash

# Firefox does not have a debian package that is kept upt to date, so instead we install deps directly and download the tar to unzip.
apt-get update \
  && apt-get install -y \
    libxtst6 \
    libgtk-3-0 \
    libdbus-glib-1-2 \
    mplayer \
  && wget --no-verbose -O /tmp/firefox.tar.bz2 https://download-installer.cdn.mozilla.net/pub/firefox/releases/${1}/linux-x86_64/en-US/firefox-${1}.tar.bz2 \
  && tar -C /opt -xjf /tmp/firefox.tar.bz2 \
  && rm /tmp/firefox.tar.bz2 \
  && ln -fs /opt/firefox/firefox /usr/bin/firefox \
