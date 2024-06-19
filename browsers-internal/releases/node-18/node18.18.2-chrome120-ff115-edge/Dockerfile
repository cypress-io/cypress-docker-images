# build this image with command
#   docker build -t cypress/browsers-internal:node18.18.2-chrome120-ff115-edge --platform linux/amd64 .
#
FROM cypress/browsers-internal:node18.18.2-chrome120-ff115

USER root

# Install dependencies
RUN apt-get update && \
  apt-get install -y \
  # edge dependencies
  gnupg \
  dirmngr \
  \
  # clean up
  && rm -rf /var/lib/apt/lists/* \
  && apt-get clean

# install latest Edge
RUN node -p "process.arch === 'arm64' ? 'Not downloading Edge since we are on arm64: https://techcommunity.microsoft.com/t5/discussions/edge-for-linux-arm64/m-p/1532272' : process.exit(1)" || \
  (curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg && \
  install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/ && \
  sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge-dev.list' && \
  rm microsoft.gpg && \
  ## Install Edge
  apt-get update && \
  apt-get install -y microsoft-edge-dev && \
  ## Add a link to the browser that allows Cypress to find it
  ln -s /usr/bin/microsoft-edge /usr/bin/edge)

# versions of local tools
RUN echo  " node version:    $(node -v) \n" \
  "npm version:     $(npm -v) \n" \
  "yarn version:    $(yarn -v) \n" \
  "debian version:  $(cat /etc/debian_version) \n" \
  "Chrome version:  $(google-chrome --version) \n" \
  "Firefox version: $(firefox --version) \n" \
  "Edge version:    n/a \n" \ 
  "git version:     $(git --version) \n" \
  "whoami:          $(whoami) \n"

