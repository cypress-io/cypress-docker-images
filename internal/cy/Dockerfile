FROM cypress/base

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

RUN npm install -g cypress-cli
RUN cypress install --cypress-version 0.19.4
RUN cypress verify
RUN cypress --version

CMD ["cypress", "run"]
