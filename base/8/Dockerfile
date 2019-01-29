FROM node:8.12

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

RUN npm install -g npm@6.4.1

# versions of local tools
RUN node -v
RUN npm -v
RUN yarn -v
