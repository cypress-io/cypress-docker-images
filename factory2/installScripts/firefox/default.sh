#! /bin/bash

apt-get update \
  && apt-get install -y \
    libdbus-glib-1-2 \
    mplayer \
    wget \
    bzip2 \
  && wget --no-verbose -O /tmp/firefox.tar.bz2 https://download-installer.cdn.mozilla.net/pub/firefox/releases/107.0/linux-x86_64/en-US/firefox-${1}.tar.bz2 \
  && tar -C /opt -xjf /tmp/firefox.tar.bz2 \
  && rm /tmp/firefox.tar.bz2 \
  && ln -fs /opt/firefox/firefox /usr/bin/firefox \
