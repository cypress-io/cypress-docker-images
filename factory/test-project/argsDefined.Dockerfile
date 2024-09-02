# Args are defined in the Dockerfile before the FROM command.
ARG CHROME_VERSION='126.0.6478.114-1'
ARG EDGE_VERSION='126.0.2592.61-1'
ARG FIREFOX_VERSION='128.0'

ARG BASE_TEST_IMAGE='cypress/factory'

FROM ${BASE_TEST_IMAGE}
RUN echo "current user: $(whoami)"
ENV CI=1
COPY . /opt/app
WORKDIR /opt/app
RUN npm install --save-dev cypress
RUN ./node_modules/.bin/cypress verify
