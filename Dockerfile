FROM node:6

RUN apt-get update && \
  apt-get install -y \
    libgtk2.0-0 \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    xvfb

# run as non-root user inside the docker container
# first add a new group "qa"
RUN groupadd -r qa && useradd -m -r -g qa cypress
# now run as new user "cypress" from group "qa"
USER cypress
