FROM node:6

RUN apt-get update && \
  apt-get install -y xvfb

# run as non-root user inside the docker container
# see https://vimeo.com/171803492 at 17:20 mark
RUN groupadd -r regular-users && useradd -m -r -g regular-users person

# give new user access to global NPM modules folder
RUN chown person /usr/local/lib/node_modules
# give new user permission to install global tools
RUN chown person /usr/local/bin

# now run as the new "non-root" user
USER person
WORKDIR /home/person

# only report NPM install warnings and errors
ENV npm_config_loglevel=warn
