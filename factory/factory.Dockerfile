# BASE_IMAGE is expected to be overridden
# Regular builds, using docker compose, take the value from
# the .env file in the same directory as this file
ARG BASE_IMAGE='debian:12-slim'

FROM ${BASE_IMAGE} AS factory

# "fake" dbus address to prevent errors
# https://github.com/SeleniumHQ/docker-selenium/issues/87
ENV DBUS_SESSION_BUS_ADDRESS=/dev/null \
  # a few environment variables to make NPM installs easier
  # good colors for most applications
  TERM=xterm \
  # avoid million NPM install messages
  npm_config_loglevel=warn \
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
  CYPRESS_CACHE_FOLDER=/root/.cache/Cypress

# give every user read access to the "/root" folder where the binary is cached
# we really only need to worry about the top folder, fortunately
# TODO: there are other folders that need permissions but I don't know what they are yet, See: https://github.com/cypress-io/cypress/issues/23962
RUN ls -la /root \
  && chmod 777 /root \
  && apt-get update \
  && apt-get install --no-install-recommends -y \
    # Always install: Needed to run Cypress
    xvfb \
    libglib2.0-0 \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libgtk-3-0 \
    libgbm1 \
    libasound2 \
    # Needed to support the ps command, while not used by cypress directly it is used by some of our examples and the dependency is small (~1mb).
    procps \
    # Needed to support curl, similar to ps, it's not directly used by cypress but leaving it in the container is practically free.
    curl \
    # Always install: Needed for dashboard integration
    git \
    # Install ssh client to enable git cloning via ssh without falling back to CI's native git client.
    openssh-client\
    # Chrome and Edge require wget even after installation. We could do more work to dynamically remove it, but I doubt it's worth it.
    wget \
    # Needed to make https calls from the docker container
    openssl \
    ca-certificates \
    # Fast lossless compression algorithm - preferred by GitHub @actions/cache
    zstd \
    # build only dependencies: removed in onbuild step
    bzip2 \
    gnupg \
    dirmngr \
    # Needed by cypress installation 'unzip.js' script
    unzip

# Copy install scripts into container, these will be deleted in an onbuild step later.
COPY ./installScripts /opt/installScripts

# Set the default node version, node is required.
ARG FACTORY_DEFAULT_NODE_VERSION

# Set the default node version to an env to allow us to access it in the onbuild step.
ENV CYPRESS_FACTORY_DEFAULT_NODE_VERSION=${FACTORY_DEFAULT_NODE_VERSION}

# Install Node: Node MUST be installed, so the default lives here
ONBUILD ARG NODE_VERSION

# Don't rely on the docker arg default, if we do the default won't be overriden if the arg is declared in the dockerfile.
ONBUILD ENV APPLIED_FACTORY_DEFAULT_NODE_VERSION=${NODE_VERSION:-${CYPRESS_FACTORY_DEFAULT_NODE_VERSION}}

# Node is installed via a bash script because node isn't installed yet!
ONBUILD RUN bash /opt/installScripts/node/install-node-version.sh ${APPLIED_FACTORY_DEFAULT_NODE_VERSION}

# Install Yarn: Optional
ONBUILD ARG YARN_VERSION

# Installed using a node script to handle conditionals since we all know javascript
ONBUILD RUN node /opt/installScripts/yarn/install-yarn-version.js ${YARN_VERSION}

# Install Chrome: optional
ONBUILD ARG CHROME_VERSION

ONBUILD RUN node /opt/installScripts/chrome/install-chrome-version.js ${CHROME_VERSION}

# Install Chrome for Testing: optional
ONBUILD ARG CHROME_FOR_TESTING_VERSION

ONBUILD RUN node /opt/installScripts/chrome-for-testing/install-chrome-for-testing-version.js ${CHROME_FOR_TESTING_VERSION}

# Install Edge: optional
ONBUILD ARG EDGE_VERSION

ONBUILD RUN node /opt/installScripts/edge/install-edge-version.js ${EDGE_VERSION}

# Install Firefox: optional
ONBUILD ARG FIREFOX_VERSION

ONBUILD RUN node /opt/installScripts/firefox/install-firefox-version.js ${FIREFOX_VERSION}

# Install Geckodriver: optional
# Used with Firefox
ONBUILD ARG GECKODRIVER_VERSION
# If geckodriver is installed, make it available to npm package geckodriver
# See https://github.com/webdriverio-community/node-geckodriver/blob/main/README.md#customgeckodriverpath
# Path is only set if geckodriver is installed
# see Dockerfile environment variable syntax https://docs.docker.com/reference/dockerfile/#environment-replacement
ONBUILD ENV GECKODRIVER_PATH=${GECKODRIVER_VERSION:+/opt/geckodriver/geckodriver}
ONBUILD RUN node /opt/installScripts/geckodriver/install-geckodriver-version.js ${GECKODRIVER_VERSION}

# TODO: Globally installed webkit currently isn't found, see issue https://github.com/cypress-io/cypress/issues/25344
# Install Webkit: optional
# ONBUILD ARG WEBKIT_VERSION

# ONBUILD RUN node /opt/installScripts/webkit/install-webkit-version.js ${WEBKIT_VERSION}

# Install Cypress: optional
ONBUILD ARG CYPRESS_VERSION

# Allow projects to reference globally installed cypress
# This is only set if the cypress version is passed in (thats what the + syntax stuff does.)
ONBUILD ENV NODE_PATH=${CYPRESS_VERSION:+/usr/local/lib/node_modules}

ONBUILD RUN node /opt/installScripts/cypress/install-cypress-version.js ${CYPRESS_VERSION}

# Global Cleanup
ONBUILD RUN apt-get purge -y --auto-remove \
    curl \
    bzip2 \
    gnupg \
    dirmngr\
  && rm -rf /usr/share/doc \
  && rm -rf /var/lib/apt/lists/* \
  # Remove cypress install scripts
  && rm -rf /opt/installScripts
