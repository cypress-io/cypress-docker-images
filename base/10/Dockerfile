FROM node:10.0

RUN apt-get update && \
  apt-get install -y \
    libgtk2.0-0 \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    xvfb

RUN npm i -g npm@6

# versions of local tools
RUN node -v
RUN npm -v
