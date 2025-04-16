FROM ubuntu:24.04

# set up NodeJS
RUN apt-get update && \
  apt-get install -y apt-transport-https ca-certificates curl gnupg
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update && apt-get install -y nodejs

# set up Python 3.11
RUN apt-get install software-properties-common -y
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get update && apt-get upgrade -y
RUN apt-get install g++ make python3.11 -y
ENV NODE_GYP_FORCE_PYTHON=/usr/bin/python3.11

# Install latest NPM and Yarn
RUN npm install -g npm@latest
RUN npm install -g yarn@latest

# install additional native dependencies build tools
RUN apt install -y build-essential

# install Git client
RUN apt-get install -y git
# install unzip utility to speed up Cypress unzips
# https://github.com/cypress-io/cypress/releases/tag/v3.8.0
RUN apt-get install -y unzip

# avoid any prompts
ENV DEBIAN_FRONTEND noninteractive
# install tzdata package
RUN apt-get install -y tzdata
# set your timezone
RUN ln -fs /usr/share/zoneinfo/America/New_York /etc/localtime
RUN dpkg-reconfigure --frontend noninteractive tzdata

# install Cypress dependencies (separate commands to avoid time outs)
RUN apt-get install -y \
    libatk1.0-0 \
    libgtk2.0-0t64 \
    libglib2.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libgtk-3-0t64 \
    libgbm1 \
    libgbm-dev
RUN apt-get install -y \
    libnotify-dev
RUN apt-get install -y \
    libnss3 \
    libxss1
RUN apt-get install -y \
    libasound2t64 \
    libxtst6 \
    xauth \
    xvfb
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
  "user:            $(whoami) \n" \
  "git:             $(git --version) \n"

RUN echo "More version info"
RUN cat /etc/lsb-release
RUN cat /etc/os-release
