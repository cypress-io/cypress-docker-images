# Args are defined in the Dockerfile before the FROM command.
ARG CHROME_VERSION='149.0.7827.155-1'
ARG EDGE_VERSION='149.0.4022.69-1'
ARG FIREFOX_VERSION='152.0'

ARG BASE_TEST_IMAGE='cypress/factory'

FROM ${BASE_TEST_IMAGE}
RUN echo "current user: $(whoami)"
ENV CI=1
COPY . /opt/app
WORKDIR /opt/app
RUN npm install cypress --save-dev --ignore-scripts
RUN npx cypress install
RUN npx cypress verify
