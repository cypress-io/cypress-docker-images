# build it with command
#   docker build -t cypress/base-internal:22.15.1-yarn-berry --platform linux/amd64 .
#
FROM node:22.15.1-bookworm-slim

RUN apt-get update && \
  apt-get install --no-install-recommends -y \
  libgtk2.0-0 \
  libgtk-3-0 \
  libnotify-dev \
  libgconf-2-4 \
  libgbm-dev \
  libnss3 \
  libxss1 \
  libasound2 \
  libxtst6 \
  procps \
  xauth \
  xvfb \
  build-essential \
  # install text editors
  vim-tiny \
  nano \
  wget \
  curl \
  git \
  # install emoji font
  fonts-noto-color-emoji \
  # install Chinese fonts
  # this list was copied from https://github.com/jim3ma/docker-leanote
  fonts-arphic-bkai00mp \
  fonts-arphic-bsmi00lp \
  fonts-arphic-gbsn00lp \
  fonts-arphic-gkai00mp \
  fonts-arphic-ukai \
  fonts-arphic-uming \
  ttf-wqy-zenhei \
  ttf-wqy-microhei \
  xfonts-wqy \
  # clean up
  && rm -rf /var/lib/apt/lists/* \
  && apt-get clean

RUN apt-get update && \
  apt-get install --no-install-recommends -y \
  ca-certificates

# a few environment variables to make NPM installs easier
# good colors for most applications
ENV TERM=xterm
# avoid million NPM install messages
ENV npm_config_loglevel=warn
# allow installing when the main user is root
ENV npm_config_unsafe_perm=true
# need to enable corepack to set yarn version
RUN corepack enable
# set the yarn version to 4 to get yarn berry, which does not install modules into node_modules
RUN yarn set version 4.3.1

RUN npm --version \
  && yarn --version \
  && node -p process.versions \
  && node -p 'module.paths' \
  && echo  " node version:    $(node -v) \n" \
    "npm version:     $(npm -v) \n" \
    "yarn version:    $(yarn -v) \n" \
    "debian version:  $(cat /etc/debian_version) \n" \
    "user:            $(whoami) \n" 