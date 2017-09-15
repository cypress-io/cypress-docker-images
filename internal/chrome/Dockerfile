FROM cypress/base

RUN echo "force new chrome"

RUN \
  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list && \
  apt-get update && \
  apt-get install -y dbus-x11 google-chrome-stable && \
  rm -rf /var/lib/apt/lists/*

RUN google-chrome --version

# Run Google Chrome with certain additional CLI options
ADD chrome.sh /usr/bin/chrome

RUN chrome --version

# "fake" dbus address to prevent errors
# https://github.com/SeleniumHQ/docker-selenium/issues/87
ENV DBUS_SESSION_BUS_ADDRESS=/dev/null

RUN apt-get update && apt-get install -y zip

# run as non-root user inside the docker container
# see https://vimeo.com/171803492 at 17:20 mark
RUN groupadd -r regular-users && useradd -m -r -g regular-users person
# now run as the new "non-root" user
USER person

# test the new user - can they access Chrome and Node?
RUN ls /home
RUN node --version
RUN chrome --version
RUN zip --version
