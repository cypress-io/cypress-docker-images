FROM cypress/base
COPY . /opt/app
WORKDIR /opt/app
RUN apt-get update              # Update package index
RUN apt-get install chromium -y # Install Chromium
RUN npx cypress install         # Install Cypress binary
