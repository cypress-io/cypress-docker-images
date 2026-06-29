ARG BASE_TEST_IMAGE='cypress/factory'

FROM ${BASE_TEST_IMAGE}
RUN echo "current user: $(whoami)"
ENV CI=1
COPY . /opt/app
WORKDIR /opt/app
RUN npm install cypress --save-dev --ignore-scripts
RUN npx cypress install
RUN npx cypress verify
