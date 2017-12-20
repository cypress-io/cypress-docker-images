FROM cypress/base:6

ARG FIREFOX_VERSION=57.0.2

USER root
RUN apt-get update && apt-get install -y wget

RUN wget --no-verbose -O /tmp/firefox.tar.bz2 https://download-installer.cdn.mozilla.net/pub/firefox/releases/$FIREFOX_VERSION/linux-x86_64/en-US/firefox-$FIREFOX_VERSION.tar.bz2 \
  && tar -C /opt -xjf /tmp/firefox.tar.bz2 \
  && rm /tmp/firefox.tar.bz2 \
  && ln -fs /opt/firefox/firefox /usr/bin/firefox

RUN apt-get update && apt-get install -y zip

USER node

# versions of local tools
RUN firefox --version
RUN zip --version
RUN git --version
