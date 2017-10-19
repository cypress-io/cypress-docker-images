FROM cypress/base

ENV npm_config_loglevel=warn

RUN npm install cypress@1.0.2
RUN node_modules/.bin/cypress verify
RUN node_modules/.bin/cypress --version

CMD ["node_modules/.bin/cypress", "run"]
