# FACTORY_VERSION is expected to be overridden
# Regular builds, using docker compose, take the value from
# the .env file in the same directory as this file
ARG FACTORY_VERSION='4.1.0'

# Multi-stage default image. Used to test and create the pre-built docker images.
FROM cypress/factory:${FACTORY_VERSION} AS default_image

# Multi-stage included image. We set the entry point only for the included image.
FROM cypress/factory:${FACTORY_VERSION} AS included_image

ENTRYPOINT ["cypress", "run"]
