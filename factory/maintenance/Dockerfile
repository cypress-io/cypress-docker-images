# BROWSERS_IMAGE is expected to be overridden
# Regular builds, using docker compose, take the values from
# the <major>.env file in the same directory as this file
ARG BROWSERS_IMAGE

# The browsers image was built from cypress/factory, whose ONBUILD steps do not run again here,
# so no browser or Node.js version is downloaded or changed.
FROM ${BROWSERS_IMAGE}

ARG CYPRESS_VERSION
ARG TYPESCRIPT_VERSION

# Allow projects to reference globally installed cypress
ENV NODE_PATH=/usr/local/lib/node_modules

# Installed here rather than with installScripts/cypress/install.sh,
# so that changes made there for newer Cypress versions do not reach these images.
RUN npm install -g "cypress@${CYPRESS_VERSION}" --ignore-scripts \
  && cypress install \
  && chmod -R 777 /root/.cache \
  && npm install -g "typescript@${TYPESCRIPT_VERSION}" \
  && echo "Installed TypeScript $(tsc --version)"

ENTRYPOINT ["cypress", "run"]
