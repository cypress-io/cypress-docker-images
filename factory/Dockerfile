ARG NODE_VERSION

FROM node:${NODE_VERSION}-slim AS base

# "fake" dbus address to prevent errors
# https://github.com/SeleniumHQ/docker-selenium/issues/87
ENV DBUS_SESSION_BUS_ADDRESS=/dev/null

# a few environment variables to make NPM installs easier
# good colors for most applications
ENV TERM=xterm
# avoid million NPM install messages
ENV npm_config_loglevel=warn
# allow installing when the main user is root
ENV npm_config_unsafe_perm=true

# Cypress deps
RUN apt-get update \
  && apt-get install --no-install-recommends -y \
    xvfb \
    git \
  && rm -rf /usr/share/doc \
  && rm -rf /usr/share/man \
  && rm -rf /var/lib/apt/lists/*

# Google Chrome deps
RUN apt-get update \
  && apt-get install --no-install-recommends -y \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libatspi2.0-0 \
    libcairo2 \
    libcups2 \
    libcurl3-gnutls \
    libdbus-1-3 \
    libdrm2 \
    libexpat1 \
    libgbm1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libwayland-client0 \
    libx11-6 \
    libxcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxkbcommon0 \
    libxrandr2 \
    xdg-utils \
  && rm -rf /usr/share/doc \
  && rm -rf /usr/share/man \
  && rm -rf /var/lib/apt/lists/*

# firefox dependencies
RUN apt-get update \
  && apt-get install --no-install-recommends -y \
  	libdbus-glib-1-2 \
    # add codecs needed for video playback in firefox
    # https://github.com/cypress-io/cypress-docker-images/issues/150
    mplayer \
  && rm -rf /usr/share/doc \
  && rm -rf /usr/share/man \
  && rm -rf /var/lib/apt/lists/*

FROM base AS chrome

ARG CHROME_VERSION

RUN apt-get update && \
  apt-get install -y \
    wget \
  && wget --no-verbose -O /usr/src/google-chrome-stable_current_amd64.deb http://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}_amd64.deb \
  && dpkg -i /usr/src/google-chrome-stable_current_amd64.deb ;

FROM base AS firefox

ARG FIREFOX_VERSION

# install Firefox browser
RUN apt-get update\
  && apt-get install -y \
    wget \
    bzip2 \
  && wget --no-verbose -O /tmp/firefox.tar.bz2 https://download-installer.cdn.mozilla.net/pub/firefox/releases/107.0/linux-x86_64/en-US/firefox-${FIREFOX_VERSION}.tar.bz2 \
  && tar -C /opt -xjf /tmp/firefox.tar.bz2

FROM base AS edge

ARG EDGE_VERSION

RUN apt-get update \
  && apt-get install -y \
    curl \
    gnupg \
    dirmngr\
  && curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg \
  && install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d \
  && sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge-dev.list' \
  && rm microsoft.gpg \
  ## Install Edge
  && apt-get update \
  && apt-get install -y microsoft-edge-dev=${EDGE_VERSION}

FROM base as final

USER root

# copy chrome from chrome stage
COPY --from=chrome /etc/default/google-chrome /etc/default/google-chrome
COPY --from=chrome /usr/share/icons/hicolor /usr/share/icons/hicolor
COPY --from=chrome /opt/google /opt/google

# Add links for chrome
RUN ln -fs /opt/google/chrome/google-chrome /usr/bin/google-chrome
RUN ln -fs /opt/google/chrome/google-chrome /usr/bin/google-chrome-stable
RUN ln -fs /opt/google/chrome/google-chrome /usr/bin/gnome-www-browser
RUN ln -fs /opt/google/chrome/google-chrome /usr/bin/x-www-browser

# copy firefox from firefox stage
COPY --from=firefox /opt/firefox /opt/firefox

# Add links for firefox
RUN ln -fs /opt/firefox/firefox /usr/bin/firefox


# copy firefox from firefox stage
COPY --from=edge /opt/microsoft /opt/microsoft
COPY --from=edge /usr/share/icons/hicolor /usr/share/icons/hicolor

# Add links for edge
RUN ln -fs /opt/microsoft/msedge-dev/microsoft-edge-dev /usr/bin/edge

ARG CYPRESS_VERSION

RUN npm install -g "cypress@${CYPRESS_VERSION}"

RUN echo  " node version:    $(node -v) \n" \
  "npm version:     $(npm -v) \n" \
  "yarn version:    $(yarn -v) \n" \
  "debian version:  $(cat /etc/debian_version) \n" \
  "Chrome version:  $(google-chrome --version) \n" \
  "Firefox version: $(firefox --version) \n" \
  "Edge version:    $(edge --version) \n" \
  "git version:     $(git --version) \n" \
  "whoami:          $(whoami) \n"

# ENTRYPOINT ["cypress", "run"]
