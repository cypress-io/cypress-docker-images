FROM ubuntu:16.04

RUN apt-get update && \
  apt-get install --no-install-recommends -y \
    apt-transport-https \
    ca-certificates \
    curl && \
  rm -rf /var/lib/apt/lists/*

RUN touch /etc/apt/sources.list.d/nodesource.list
RUN echo "deb https://deb.nodesource.com/node_6.x xenial main" > /etc/apt/sources.list.d/nodesource.list
RUN echo "deb-src https://deb.nodesource.com/node_6.x xenial main" >> /etc/apt/sources.list.d/nodesource.list

RUN curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -

# Should install Node 6
# Install Git client
RUN apt-get update && \
  apt-get install --no-install-recommends -y \
    nodejs \
    git \
    libgtk2.0-0 \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xvfb && \
    rm -rf /var/lib/apt/lists/*

RUN git --version
