#! /bin/bash

apt-get update
apt-get install --no-install-recommends -y \
  libgstreamer1.0-0 \
  libevent-2.1-7 \
  libopus0 \
  libxslt1.1 \
  libwoff1 \
  libharfbuzz-icu0 \
  libgstreamer-plugins-base1.0-0 \
  libgstreamer-gl1.0-0 \
  libopenjp2-7 \
  libwebpdemux2 \
  libenchant-2-2 \
  libsecret-1-0 \
  libhyphen0 \
  libmanette-0.2-0 \
  libatomic1 \
  libgles2 \
  gstreamer1.0-libav

npm install -g "playwright-webkit@${1}"
