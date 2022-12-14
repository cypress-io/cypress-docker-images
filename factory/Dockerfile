ARG NODE_VERSION

FROM node:${NODE_VERSION}-slim AS base

# "fake" dbus address to prevent errors
# https://github.com/SeleniumHQ/docker-selenium/issues/87
ENV DBUS_SESSION_BUS_ADDRESS=/dev/null

RUN apt-get update

# Google Chrome deps
RUN  apt-get install --no-install-recommends -y \
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
RUN  apt-get install --no-install-recommends -y \
  # add codecs needed for video playback in firefox
  # https://github.com/cypress-io/cypress-docker-images/issues/150
  mplayer \
  && rm -rf /usr/share/doc \
  && rm -rf /usr/share/man \
  && rm -rf /var/lib/apt/lists/*

FROM base AS chrome

RUN apt-get install -y \
  wget

ARG CHROME_VERSION

RUN wget --no-verbose -O /usr/src/google-chrome-stable_current_amd64.deb http://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}_amd64.deb \
 && dpkg -i /usr/src/google-chrome-stable_current_amd64.deb ;

FROM base AS firefox

RUN apt-get install -y \
	libdbus-glib-1-2 \
  wget \
  bzip2

ARG FIREFOX_VERSION

  # install Firefox browser
RUN wget --no-verbose -O /tmp/firefox.tar.bz2 https://download-installer.cdn.mozilla.net/pub/firefox/releases/107.0/linux-x86_64/en-US/firefox-${FIREFOX_VERSION}.tar.bz2 \
  && tar -C /opt -xjf /tmp/firefox.tar.bz2

FROM base AS edge

RUN apt-get install -y \
  curl \
  gnupg \
  dirmngr

ARG EDGE

RUN curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg && \
  install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/ && \
  sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge-dev.list' && \
  rm microsoft.gpg
  ## Install Edge
  # apt-get install -y microsoft-edge-dev
  ## Add a link to the browser that allows Cypress to find it
  # ln -s /usr/bin/microsoft-edge /usr/bin/edge

FROM base as final

USER root

# copy chrome from chrome stage
COPY --from=chrome --chown=root /etc/default/google-chrome /etc/default/google-chrome
COPY --from=chrome --chown=root /usr/share/icons/hicolor /usr/share/icons/hicolor
COPY --from=chrome --chown=root /opt/google /opt/google

# Add links for chrome
RUN ln -fs /opt/google/chrome/google-chrome /usr/bin/google-chrome
RUN ln -fs /opt/google/chrome/google-chrome /usr/bin/google-chrome-stable
RUN ln -fs /opt/google/chrome/google-chrome /usr/bin/gnome-www-browser
RUN ln -fs /opt/google/chrome/google-chrome /usr/bin/x-www-browser

# copy firefox from firefox stage
COPY --from=firefox /opt/firefox /opt/firefox

# Add links for firefox
RUN ln -fs /opt/firefox/firefox /usr/bin/firefox

ARG CYPRESS_VERSION

RUN npm install -g "cypress@${CYPRESS_VERSION}"
