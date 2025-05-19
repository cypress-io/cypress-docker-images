#! /bin/bash

# geckodriver for Firefox does not have a Debian package, so instead we download the tar to unzip.
#
# $1: version (example: 0.36.0)
# $2: platformFilename (linux64 or linux-aarch64)

wget --no-verbose -O /tmp/geckodriver.tar.gz https://github.com/mozilla/geckodriver/releases/download/v${1}/geckodriver-v${1}-${2}.tar.gz \
  && mkdir -p /opt/geckodriver \
  && tar -C /opt/geckodriver -xaf /tmp/geckodriver.tar.gz \
  && rm /tmp/geckodriver.tar.gz \
