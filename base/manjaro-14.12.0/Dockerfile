# if manjaro linux had tags, I would prefer to use them
# but seems they only have "latest"
# https://hub.docker.com/r/manjarolinux/base/tags
FROM manjarolinux/base@sha256:d16e6028ce6abfa28721b803745fe92a476ad8de523eb3239bbbe7e5eb117c46

# set environment to annoy me less
# good colors for most applications
ENV TERM xterm
# avoid million NPM install messages
ENV npm_config_loglevel warn
# allow installing when the main user is root
ENV npm_config_unsafe_perm true
# avoid gazillions of progress messages
ENV CI=1


#### OS setup ####
RUN pacman --noconfirm -Syyu
# Install tooling
# How to specify Node / NPM / Yarn versions?
RUN pacman --noconfirm -S nodejs npm yarn git unzip
# set your timezone
RUN ln -fs /usr/share/zoneinfo/America/New_York /etc/localtime
# Install Cypress dependencies
RUN pacman --noconfirm -S \
  gtk2 \
  gtk3 \
  libnotify \
  gconf \
  nss \
  xscreensaver \
  alsa-lib \
  libxtst \
  libxss \
  xorg-xauth \
  xorg-server-xvfb

RUN npm i -g yarn@latest npm@latest
RUN npm config -g set user $(whoami)
RUN id

# versions of local tools
RUN echo -e \
  " node:    $(node -v)\n" \
  "npm:     $(npm -v)\n" \
  "yarn:    $(yarn -v)\n" \
  "user:    $(whoami)\n" \
  "git:     $(git --version)\n"
