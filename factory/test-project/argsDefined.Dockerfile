# Args are defined in the Dockerfile before the FROM command.
ARG CHROME_VERSION='131.0.6778.264-1'
ARG EDGE_VERSION='131.0.2903.112-1'
ARG FIREFOX_VERSION='134.0'

ARG BASE_TEST_IMAGE='cypress/factory'

FROM ${BASE_TEST_IMAGE}
RUN echo "current user: $(whoami)"
ENV CI=1
COPY . /opt/app
WORKDIR /opt/app
RUN npm install cypress --save-dev --ignore-scripts
RUN npx cypress install
RUN npx cypress verify
