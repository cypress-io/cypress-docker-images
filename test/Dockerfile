FROM cypress/base:16.14.2-slim

RUN echo "current user: $(whoami)"
RUN echo "current node: $(node -v)"
RUN echo "current npm:  $(npm -v)"

# avoid too many progress messages
# https://github.com/cypress-io/cypress/issues/1243
ENV CI=1
# create package.json file
RUN npm init --yes

# # install either a specific version of the Cypress binary
# ENV CYPRESS_INSTALL_BINARY=https://cdn.cypress.io/beta/binary/4.0.3/darwin-x64/circle-develop-cb0f32b0b4913cbb403f2e7c51b23ecad50ece9f-266831/cypress.zip
# RUN npm install --save-dev cypress@4.0.2
RUN npm install --save-dev cypress

# show where Cypress binary was installed
# hmm, why silent exit?!
RUN $(npm bin)/cypress cache path

RUN ELECTRON_ENABLE_STACK_DUMPING=1 $(npm bin)/cypress verify
# install Cypress
RUN $(npm bin)/cypress install
# if testing a base image with just Electron use "cypress run"
RUN $(npm bin)/cypress run
# # # if testing an image with Chrome browser
# # RUN $(npm bin)/cypress run --browser chrome

# # RUN cat /etc/fonts/fonts.conf
