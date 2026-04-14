# build it with command
#   docker build -t cypress/base-internal:24.14.0-glibc-2.31 --platform linux/amd64 .
#
# Ubuntu 20.04 LTS ships glibc 2.31. GCC 11 comes from ubuntu-toolchain-r/test (not in default Focal repos).
#
FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Etc/UTC

RUN apt-get update && \
  apt-get install --no-install-recommends -y \
  ca-certificates \
  curl \
  gnupg \
  software-properties-common \
  tzdata \
  && add-apt-repository -y ppa:ubuntu-toolchain-r/test \
  && apt-get update \
  && apt-get install --no-install-recommends -y \
  gcc-11 \
  g++-11 \
  && if [ "$(dpkg --print-architecture)" = "amd64" ]; then \
    apt-get install --no-install-recommends -y gcc-11-multilib g++-11-multilib; \
  fi \
  && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /etc/apt/keyrings && \
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_24.x nodistro main" > /etc/apt/sources.list.d/nodesource.list && \
  apt-get update && \
  apt-get install --no-install-recommends -y nodejs && \
  rm -rf /var/lib/apt/lists/*

USER root

RUN node --version

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
  vim-tiny \
  nano \
  fonts-noto-color-emoji \
  fonts-arphic-bkai00mp \
  fonts-arphic-bsmi00lp \
  fonts-arphic-gbsn00lp \
  fonts-arphic-gkai00mp \
  fonts-arphic-ukai \
  fonts-arphic-uming \
  ttf-wqy-zenhei \
  ttf-wqy-microhei \
  xfonts-wqy \
  && rm -rf /var/lib/apt/lists/* \
  && apt-get clean

RUN apt-get update && \
  apt-get install --no-install-recommends -y \
  fonts-liberation \
  git \
  libcurl4 \
  libcurl3-gnutls \
  libcurl3-nss \
  libvulkan1 \
  xdg-utils \
  wget \
  gpg \
  jq \
  curl \
  libu2f-udev \
  bzip2 \
  mplayer \
  libappindicator3-1 \
  python3 \
  xz-utils \
  make \
  autoconf \
  && rm -rf /var/lib/apt/lists/* \
  && apt-get clean

RUN update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-9 90 --slave /usr/bin/g++ g++ /usr/bin/g++-9 && \
  update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-11 110 --slave /usr/bin/g++ g++ /usr/bin/g++-11 && \
  update-alternatives --set gcc /usr/bin/gcc-11

ENV TERM=xterm
ENV npm_config_loglevel=warn

RUN npm --version \
  && npm install -g yarn@latest --force \
  && yarn --version \
  && node -p process.versions \
  && node -p 'module.paths' \
  && echo  " node version:    $(node -v) \n" \
    "npm version:     $(npm -v) \n" \
    "yarn version:    $(yarn -v) \n" \
    "gcc version:     $(gcc --version | head -1) \n" \
    "python3 version: $(python3 --version) \n" \
    "os:              $(. /etc/os-release && echo ${PRETTY_NAME}) \n" \
    "user:            $(whoami) \n"
