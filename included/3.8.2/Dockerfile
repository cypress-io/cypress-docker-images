FROM cypress/browsers:node12.6.0-chrome77

# avoid too many progress messages
# https://github.com/cypress-io/cypress/issues/1243
ENV CI=1
ARG CYPRESS_VERSION="3.8.2"

# should be root user
RUN echo "whoami: $(whoami)"
RUN npm config -g set user $(whoami)
# uid=0(root) gid=0(root) groups=0(root)
# meaning root
RUN id

# point Cypress at the /root/cache no matter what user account is used
# see https://on.cypress.io/caching
ENV CYPRESS_CACHE_FOLDER=/root/.cache/Cypress
RUN npm install -g "cypress@${CYPRESS_VERSION}"
RUN cypress verify

# Cypress cache and installed version
# should be in the root user's home folder
RUN cypress cache path
RUN cypress cache list

# give every user read access to the "/root" folder where the binary is cached
# we really only need to worry about the top folder, fortunately
RUN ls -la /root
RUN chmod 755 /root

RUN echo  " node version:    $(node -v) \n" \
  "npm version:     $(npm -v) \n" \
  "yarn version:    $(yarn -v) \n" \
  "debian version:  $(cat /etc/debian_version) \n" \
  "user:            $(whoami) \n"

ENTRYPOINT ["cypress", "run"]
