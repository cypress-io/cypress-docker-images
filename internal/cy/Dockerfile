FROM cypress/base

# only report NPM install warnings and errors
ENV npm_config_loglevel=warn

RUN npm install -g cypress-cli
RUN cypress install --cypress-version 0.19.2
RUN cypress verify
RUN cypress --version

CMD ["cypress", "run"]
