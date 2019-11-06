FROM cypress/browsers:node12.6.0-chrome77

# avoid too many progress messages
# https://github.com/cypress-io/cypress/issues/1243
ENV CI=1
ARG CYPRESS_VERSION="3.6.0"

RUN echo "whoami: $(whoami)" && \
    npm config -g set user $(whoami) && \
    npm install -g "cypress@${CYPRESS_VERSION}" && \
    cypress verify && \
    cypress cache path && \
    cypress cache list && \
    echo  " node version:    $(node -v) \n" \
      "npm version:     $(npm -v) \n" \
      "yarn version:    $(yarn -v) \n" \
      "debian version:  $(cat /etc/debian_version) \n" \
      "user:            $(whoami) \n"

ENTRYPOINT ["cypress", "run"]
