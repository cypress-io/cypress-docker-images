FROM node:10.13

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

# versions of local tools
RUN node -v
# NPM version should already be pretty new (> 6.4.0)
RUN npm -v
RUN yarn -v
