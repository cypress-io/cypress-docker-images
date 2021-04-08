FROM cypress/base:14.16.0

USER root

# install Chrome browser
ENV CHROME_VERSION=89.0.4389.72 \
  FIREFOX_VERSION=86.0.1 \
  # "fake" dbus address to prevent errors
  # https://github.com/SeleniumHQ/docker-selenium/issues/87
  DBUS_SESSION_BUS_ADDRESS=/dev/null \
  # a few environment variables to make NPM installs easier
  # good colors for most applications
  TERM=xterm \
  # avoid million NPM install messages
  npm_config_loglevel=warn \
  # allow installing when the main user is root
  npm_config_unsafe_perm=true

# Chrome dependencies
RUN apt-get update \
  && apt-get install -y \
    bzip2 \
    fonts-liberation \
    libappindicator3-1 \
    # add codecs needed for video playback in firefox
    # https://github.com/cypress-io/cypress-docker-images/issues/150
    mplayer \
    wget \
    xdg-utils \
    # Add zip utility - it comes in very handy
    zip \
  # clean up
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN wget --no-verbose -O /usr/src/google-chrome-stable_current_amd64.deb "http://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}-1_amd64.deb" && \
  dpkg -i /usr/src/google-chrome-stable_current_amd64.deb ; \
  apt-get install -f -y \
  && rm -f /usr/src/google-chrome-stable_current_amd64.deb \
  apt-get clean

RUN wget --no-verbose -O /tmp/firefox.tar.bz2 https://download-installer.cdn.mozilla.net/pub/firefox/releases/$FIREFOX_VERSION/linux-x86_64/en-US/firefox-$FIREFOX_VERSION.tar.bz2 \
  && tar -C /opt -xjf /tmp/firefox.tar.bz2 \
  && rm /tmp/firefox.tar.bz2 \
  && ln -fs /opt/firefox/firefox /usr/bin/firefox

RUN echo  " node version:    $(node -v) \n" \
  "npm version:     $(npm -v) \n" \
  "yarn version:    $(yarn -v) \n" \
  "debian version:  $(cat /etc/debian_version) \n" \
  "Chrome version:  $(google-chrome --version) \n" \
  "Firefox version: $(firefox --version) \n" \
  "git version:     $(git --version) \n" \
  "whoami:          $(whoami) \n"
