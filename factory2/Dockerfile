ARG BASE_IMAGE=debian:bullseye-slim

FROM ${BASE_IMAGE} as factory

COPY ./installScripts /opt/installScripts

ONBUILD ARG NODE_VERSION=16.18.1

ONBUILD RUN bash /opt/installScripts/node/install-version.sh ${NODE_VERSION}

ONBUILD ARG YARN_VERSION

ONBUILD RUN node /opt/installScripts/yarn/install-version.js ${YARN_VERSION}

ONBUILD ARG CHROME_VERSION

ONBUILD RUN node /opt/installScripts/chrome/install-version.js ${CHROME_VERSION}

ONBUILD ARG EDGE_VERSION

ONBUILD RUN node /opt/installScripts/edge/install-version.js ${EDGE_VERSION}

ONBUILD ARG FIREFOX_VERSION

ONBUILD RUN node /opt/installScripts/firefox/install-version.js ${FIREFOX_VERSION}

# Global Cleanup, individual cleanup should be per install step
# ONBUILD RUN apt-get purge \
#     wget \
#   && apt-get autoremove \
#   && rm -rf /usr/share/doc \
#   && rm -rf /usr/share/man \
#   && rm -rf /var/lib/apt/lists/* \
#   && rm -rf /opt/installScripts

FROM factory as test
