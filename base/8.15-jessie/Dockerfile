FROM node:8.15-jessie

RUN apt-get update --fix-missing && \
  apt-get install -y --no-install-recommends \
    libgtk2.0-0 \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    xvfb \
  && rm -rf /var/lib/apt/lists/*

RUN npm install -g npm@6.9.0
RUN npm install -g yarn@1.15.2

# versions of local tools
RUN echo "node version: $(node -v)" \
  "\nnpm version: $(npm -v)" \
  "\nyarn verison: $(yarn -v)" \
  "\ndebian version: $(cat /etc/debian_version)"
