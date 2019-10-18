FROM cypress/browsers:node12.0.0-chrome73

USER root

# add codecs needed for video playback in firefox 
# https://github.com/cypress-io/cypress-docker-images/issues/150
RUN apt-get install apt-transport-https -y && \
curl https://download.videolan.org/pub/debian/videolan-apt.asc | apt-key add - && \
echo 'deb https://download.videolan.org/pub/debian/stable ./' | tee /etc/apt/sources.list.d/libdvdcss.list && \
apt-get update && \
apt-get install mplayer2 -y

ARG FIREFOX_VERSION=68.0.2

# install Firefox browser
RUN wget --no-verbose -O /tmp/firefox.tar.bz2 https://download-installer.cdn.mozilla.net/pub/firefox/releases/$FIREFOX_VERSION/linux-x86_64/en-US/firefox-$FIREFOX_VERSION.tar.bz2 && \
  tar -C /opt -xjf /tmp/firefox.tar.bz2 && \
  rm /tmp/firefox.tar.bz2 && \
  ln -fs /opt/firefox/firefox /usr/bin/firefox

