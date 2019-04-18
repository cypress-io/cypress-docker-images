FROM cypress/base:8.9.3
# avoid too many progress messages
# https://github.com/cypress-io/cypress/issues/1243
ENV CI=1
# create package.json file
RUN npm init --yes
RUN npm install --save-dev cypress
RUN $(npm bin)/cypress verify
# initialize a basic project with Cypress tests
RUN npx @bahmutov/cly init
# if testing a base image with just Electron use "cypress run"
RUN $(npm bin)/cypress run
# if testing an image with Chrome browser
# RUN $(npm bin)/cypress run --browser chrome
