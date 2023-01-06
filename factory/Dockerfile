
ARG FACTORY_VERSION

# Multi-stage default image. Used to test and create the pre-built docker images.
FROM cypress/factory:${FACTORY_VERSION} as default_image

# Multi-stage included image. We set the entry point only for the included image.
FROM cypress/factory${FACTORY_VERSION} as included_image

ENTRYPOINT ["cypress", "run"]
