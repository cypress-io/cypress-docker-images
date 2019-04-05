FROM node:11.13.0

RUN apt-get update && \
  apt-get install --no-install-recommends -y \
    libgtk2.0-0 \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xvfb && \
    rm -rf /var/lib/apt/lists/*

RUN npm install -g npm@6.9.0
RUN npm install -g yarn@1.15.2

# versions of local tools
RUN echo  " node version:    $(node -v) \n" \
          "npm version:     $(npm -v) \n" \
          "yarn verison:    $(yarn -v) \n" \
          "debian version:  $(cat /etc/debian_version) \n"
