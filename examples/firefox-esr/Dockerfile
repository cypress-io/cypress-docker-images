FROM cypress/base
COPY . /opt/app
WORKDIR /opt/app
RUN apt-get update                 # Update package index
RUN apt-get install firefox-esr -y # Install Firefox ESR
RUN npx cypress install            # Install Cypress binary
