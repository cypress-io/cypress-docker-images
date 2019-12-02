FROM cypress/browsers:node12.13.0-chrome78-ff70

USER root

# install desired node version
# see: https://github.com/nodejs/docker-node/blob/bd2ecff0929173daa8e6099d59097f24718d428e/10/jessie/Dockerfile
ENV NODE_VERSION 12.8.1
RUN rm /usr/local/bin/node /usr/local/bin/nodejs
RUN ARCH= && dpkgArch="$(dpkg --print-architecture)" \
  && case "${dpkgArch##*-}" in \
    amd64) ARCH='x64';; \
    ppc64el) ARCH='ppc64le';; \
    s390x) ARCH='s390x';; \
    arm64) ARCH='arm64';; \
    armhf) ARCH='armv7l';; \
    i386) ARCH='x86';; \
    *) echo "unsupported architecture"; exit 1 ;; \
  esac \
  && set -ex \
  && curl -fsSLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-$ARCH.tar.xz" \
  && curl -fsSLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-$ARCH.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
  && tar -xJf "node-v$NODE_VERSION-linux-$ARCH.tar.xz" -C /usr/local --strip-components=1 --no-same-owner \
  && rm "node-v$NODE_VERSION-linux-$ARCH.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt \
  && ln -s /usr/local/bin/node /usr/local/bin/nodejs

# "fake" dbus address to prevent errors
# https://github.com/SeleniumHQ/docker-selenium/issues/87
ENV DBUS_SESSION_BUS_ADDRESS=/dev/null

# Add zip utility - it comes in very handy
RUN apt-get update && apt-get install -y zip

RUN npm i -g npm@6.10.3 yarn@1.17.3

# Install xauth for Cypress development work
RUN apt-get install -y xauth
RUN xauth version

# versions of local tools
RUN echo  " node version:    $(node -v) \n" \
          "npm version:     $(npm -v) \n" \
          "yarn version:    $(yarn -v) \n" \
          "debian version:  $(cat /etc/debian_version) \n" \
          "Chrome version:  $(google-chrome --version) \n" \
          "Firefox version: $(firefox -v) \n" \
          "git version:     $(git --version) \n"

# a few environment variables to make NPM installs easier
# good colors for most applications
ENV TERM xterm
# avoid million NPM install messages
ENV npm_config_loglevel warn
# allow installing when the main user is root
ENV npm_config_unsafe_perm true
