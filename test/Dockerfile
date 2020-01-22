# FROM cypress/base:10.11.0
# FROM cypress/base:12.4.0
# FROM cypress/browsers:node12.6.0-chrome77
#
FROM cypress/base:ubuntu19-node12.14.1

RUN echo "current user: $(whoami)"
RUN echo "current node: $(node -v)"

# avoid too many progress messages
# https://github.com/cypress-io/cypress/issues/1243
ENV CI=1
# create package.json file
RUN npm init --yes

# # install either a specific version of Cypress
RUN npm install --save-dev cypress@3.8.2
# # or install a beta version of Cypress using environment variables
# # ENV CYPRESS_INSTALL_BINARY=https://cdn.cypress.io/beta/binary/3.3.0/linux64/circle-develop-40502cbfb7b934afce0a7b1dba4141dab4adb202-100529/cypress.zip
# # RUN npm install https://cdn.cypress.io/beta/npm/3.3.0/circle-develop-40502cbfb7b934afce0a7b1dba4141dab4adb202-100527/cypress.tgz

# show where Cypress binary was installed
# hmm, why silent exit?!
RUN $(npm bin)/cypress cache path

RUN ELECTRON_ENABLE_STACK_DUMPING=1 $(npm bin)/cypress verify
# initialize a basic project with Cypress tests
RUN npx @bahmutov/cly init
# if testing a base image with just Electron use "cypress run"
RUN $(npm bin)/cypress run
# # # if testing an image with Chrome browser
# # RUN $(npm bin)/cypress run --browser chrome

# # RUN cat /etc/fonts/fonts.conf
