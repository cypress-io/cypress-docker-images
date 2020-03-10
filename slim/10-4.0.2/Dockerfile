FROM node:10-slim

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
        libgtk2.0-0 \
        libgtk-3-0 \
        libnotify-dev \
        libgconf-2-4 \
        libnss3 \
        libxss1 \
        libasound2 \
        libxtst6 \
        xauth \
        xvfb \
        wget \
        unzip && \
    mkdir -p ~/.cache/Cypress/4.0.2/Cypress && \
    wget -O /tmp/z.$$ http://download.cypress.io/desktop/4.0.2?platform=linux && \
    unzip -d ~/.cache/Cypress/4.0.2/ /tmp/z.$$ && \
    rm /tmp/z.$$ && \
    chmod +x ~/.cache/Cypress/4.0.2/Cypress/Cypress && \
    apt-get purge -y \
        wget \
        unzip && \
    rm -rf /var/lib/apt/lists/*
