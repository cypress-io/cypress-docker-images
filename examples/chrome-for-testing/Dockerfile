FROM cypress/base
COPY . /opt/app
WORKDIR /opt/app
# Install Cypress binary
RUN npx cypress install
# Install Chrome for Testing
ARG CHROME_VERSION=stable
RUN INSTALL_OUTPUT=$(npx @puppeteer/browsers install chrome@${CHROME_VERSION} --path /tmp/chrome-for-testing) && \
DOWNLOAD_DIR=$(echo "$INSTALL_OUTPUT" | grep -o '\/.*\/chrome-linux64') && \
mv $DOWNLOAD_DIR /opt/chrome-for-testing
RUN ln -fs /opt/chrome-for-testing/chrome /usr/local/bin/chrome
RUN rm -rf /tmp/chrome-for-testing
