FROM node:6.16

RUN apt-get update && \
  apt-get install -y \
    libgtk2.0-0 \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    xvfb

# versions of local tools
RUN echo " node version:           $(node -v) \n" \
  "npm version:            $(npm -v) \n" \
  "yarn version:           $(yarn -v)  \n" \
  "debian version:         $(cat /etc/debian_version) \n"
