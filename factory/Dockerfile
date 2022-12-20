# Set base image arg to allow easy testing of other debian versions.
ARG BASE_IMAGE=debian:bullseye-slim

FROM ${BASE_IMAGE} as factory

# "fake" dbus address to prevent errors
# https://github.com/SeleniumHQ/docker-selenium/issues/87
ENV DBUS_SESSION_BUS_ADDRESS=/dev/null \
  # a few environment variables to make NPM installs easier
  # good colors for most applications
  TERM=xterm \
  # avoid million NPM install messages
  npm_config_loglevel=warn \
  # allow installing when the main user is root
  npm_config_unsafe_perm=true \
  # avoid too many progress messages
  # https://github.com/cypress-io/cypress/issues/1243
  CI=1 \
  # disable shared memory X11 affecting Cypress v4 and Chrome
  # https://github.com/cypress-io/cypress-docker-images/issues/270
  QT_X11_NO_MITSHM=1 \
  _X11_NO_MITSHM=1 \
  _MITSHM=0 \
  # point Cypress at the /root/cache no matter what user account is used
  # see https://on.cypress.io/caching
  CYPRESS_CACHE_FOLDER=/root/.cache/Cypress \
  # TODO: only do this when installing Cypress
  # Allow projects to reference globally installed cypress
  NODE_PATH=/usr/local/lib/node_modules

# give every user read access to the "/root" folder where the binary is cached
# we really only need to worry about the top folder, fortunately
# TODO: there are other folders that need permissions but i don't know what they are yet, See: https://github.com/cypress-io/cypress/issues/23962
RUN ls -la /root \
  && chmod 755 /root \
  && apt-get update \
  && apt-get install --no-install-recommends -y \
    # Needed for Cypress
    xvfb \
    libglib2.0-0 \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libgtk-3-0 \
    libgbm1 \
    libasound2 \
    # Needed for dashboard integration
    git \
    # TODO: dynamically add/remove wget??? chome and edge depend on it in prod but firefox only needs it for install, cypress doesn't need it at all.
    wget \
    # build only dependancies
    bzip2 \
    curl \
    gnupg \
    dirmngr

COPY ./installScripts /opt/installScripts

# Install Node: Node MUST be installed, so the default lives here
ONBUILD ARG NODE_VERSION=16.18.1

# Node is isntalled via a bash script because node isn't installed yet!
ONBUILD RUN bash /opt/installScripts/node/install-version.sh ${NODE_VERSION}

# Install Yarn: Optional
ONBUILD ARG YARN_VERSION

# Installed using a node script to handle conditionals since we all know javascript
ONBUILD RUN node /opt/installScripts/yarn/install-version.js ${YARN_VERSION}

# Install Chrome: optional
ONBUILD ARG CHROME_VERSION

ONBUILD RUN node /opt/installScripts/chrome/install-version.js ${CHROME_VERSION}

# Install Edge: optional
ONBUILD ARG EDGE_VERSION

ONBUILD RUN node /opt/installScripts/edge/install-version.js ${EDGE_VERSION}

# Install Firefox: optional
ONBUILD ARG FIREFOX_VERSION

ONBUILD RUN node /opt/installScripts/firefox/install-version.js ${FIREFOX_VERSION}

# Install Cypress: optional
ONBUILD ARG CYPRESS_VERSION

ONBUILD RUN node /opt/installScripts/cypress/install-version.js ${CYPRESS_VERSION}

# Global Cleanup, individual cleanup should be per install step
# TODO: should we run this based on an arg flag?
ONBUILD RUN apt-get purge -y --auto-remove \
    bzip2 \
    curl \
    gnupg \
    dirmngr\
  && rm -rf /usr/share/doc \
  && rm -rf /usr/share/man \
  && rm -rf /var/lib/apt/lists/* \
  && rm -rf /opt/installScripts

# Multi-stage test image. Used to test and create the pre-built docker images.
FROM factory as test
