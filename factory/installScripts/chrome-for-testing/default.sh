#! /bin/bash

# Download locations on https://googlechromelabs.github.io/chrome-for-testing/ - see JSON endpoints

wget --no-verbose -P /tmp/chrome-for-testing https://storage.googleapis.com/chrome-for-testing-public/${1}/${2}/chrome-${2}.zip
unzip /tmp/chrome-for-testing/chrome-${2}.zip -d /tmp/chrome-for-testing
mv /tmp/chrome-for-testing/chrome-${2} /opt/chrome-for-testing
apt-get update
while read -r pkg
do
apt-get satisfy -y --no-install-recommends "${pkg}"
done < /opt/chrome-for-testing/deb.deps
ln -fs /opt/chrome-for-testing/chrome /usr/local/bin/chrome
rm -rf /tmp/chrome-for-testing
