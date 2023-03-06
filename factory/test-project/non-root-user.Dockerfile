ARG BASE_TEST_IMAGE

FROM ${BASE_TEST_IMAGE}
RUN echo "current user: $(whoami)"
ENV CI=1
COPY --chown=node . /opt/app
WORKDIR /opt/app
RUN npm install --save-dev cypress
RUN chmod -R 777 /opt
RUN ./node_modules/.bin/cypress verify
