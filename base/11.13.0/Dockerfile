FROM node:11.13.0

# install Cypress OS dependencies
# but do not install recommended libs and clean temp files
#
# note:
#   Gtk2 for Cypress < 3.3.0
#   Gtk3 for Cypress >= 3.3.0
RUN apt-get update && \
  apt-get install --no-install-recommends -y \
  libgtk2.0-0 \
  libgtk-3-0 \
  libnotify-dev \
  libgconf-2-4 \
  libnss3 \
  libxss1 \
  libasound2 \
  libxtst6 \
  xauth \
  xvfb && \
  rm -rf /var/lib/apt/lists/*

RUN npm install -g npm@6.9.0
RUN npm install -g yarn@1.15.2

# versions of local tools
RUN echo  " node version:    $(node -v) \n" \
  "npm version:     $(npm -v) \n" \
  "yarn version:    $(yarn -v) \n" \
  "debian version:  $(cat /etc/debian_version) \n" \
  "user:            $(whoami) \n"
