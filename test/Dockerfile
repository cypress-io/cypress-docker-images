FROM cypress/base

ENV npm_config_loglevel=warn

RUN npm install -g cypress-cli
RUN cypress install
RUN cypress verify
RUN cypress --version

CMD ["cypress", "run"]
