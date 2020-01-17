FROM node:12-alpine

RUN apk update && \
  apk add \
  gtk+3.0 \
  libnotify-dev \
  gconf \
  nss \
  alsa-lib \
  libxtst \
  xauth \
  xvfb


RUN npm install -g npm@latest
RUN npm install -g -f yarn@latest

# a few environment variables to make NPM installs easier
# good colors for most applications
ENV TERM xterm
# avoid million NPM install messages
ENV npm_config_loglevel warn
# allow installing when the main user is root
ENV npm_config_unsafe_perm true

# versions of local tools
RUN echo  " node version:    $(node -v) \n" \
  "npm version:     $(npm -v) \n" \
  "yarn version:    $(yarn -v) \n" \
  "debian version:  $(cat /etc/debian_version) \n" \
  "user:            $(whoami) \n"
