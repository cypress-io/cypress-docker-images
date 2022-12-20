# Args are defined in the dockerfile before the FROM command.
ARG CHROME_VERSION='107.0.5304.121-1'
ARG EDGE_VERSION='110.0.1556.0-1'
ARG FIREFOX_VERSION='107.0'

FROM factory_factory
RUN echo "current user: $(whoami)"
ENV CI=1
COPY . /opt/app
WORKDIR /opt/app
RUN npm install --save-dev cypress
RUN ./node_modules/.bin/cypress verify
