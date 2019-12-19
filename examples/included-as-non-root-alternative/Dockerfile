# image has Cypress npm module installed globally in /root/.npm/node_modules
# and Cypress binary cached in /root/.cache/Cypress folder
FROM cypress/included:3.8.0

# "root"
RUN whoami
# uid=0(root) gid=0(root) groups=0(root)
# meaning root
RUN id

# give every user read access to the "/root" folder where the binary is cached
# we really only need to worry about the top folder, fortunately
RUN ls -la /root
RUN chmod 755 /root
# point Cypress at the /root/cache no matter what user account is used
# see https://on.cypress.io/caching
ENV CYPRESS_CACHE_FOLDER=/root/.cache/Cypress

# switch to non-root user "node" that comes from Docker Node image
USER node
# show user effective id and group - it should be non-zero
# meaning the current user "node" is not root
RUN id
# user "node" should be able to access the Cypress test runner now
RUN ls -la /root/.cache/Cypress/*/Cypress
RUN cat /root/.cache/Cypress/*/Cypress/binary_state.json
