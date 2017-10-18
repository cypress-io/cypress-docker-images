FROM node:8.7

RUN apt-get update && \
    apt-get install -y \
    libgtk2.0-0 \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    xvfb \
    zip && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get clean

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list && \
  apt-get update && \
  apt-get install -y dbus-x11 google-chrome-stable && \
  rm -rf /var/lib/apt/lists/* && \
  apt-get clean

ENV DBUS_SESSION_BUS_ADDRESS=/dev/null

ENV CYPRESS_VERSION 1.0.2

RUN yarn global add cypress@${CYPRESS_VERSION} && \
    cypress install && \
    cypress verify && \
    cypress --version