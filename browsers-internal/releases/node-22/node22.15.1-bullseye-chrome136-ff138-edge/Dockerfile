# build this image with command
#   docker build -t cypress/browsers-internal:node22.15.1-bullseye-chrome136-ff138-edge --platform linux/amd64 .
#
FROM cypress/browsers-internal:node22.15.1-bullseye-chrome136-ff138

USER root

# install Microsoft Edge
RUN node -p "process.arch === 'arm64' ? 'Not downloading Edge since we are on arm64' : process.exit(1)" || \
  (curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg && \
  install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/ && \
  sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge.list' && \
  apt-get update && \
  apt-get install -y microsoft-edge-stable && \
  rm microsoft.gpg && \
  rm -rf /var/lib/apt/lists/* && \
  apt-get clean)

# versions of local tools
RUN echo  " node version:    $(node -v) \n" \
  "npm version:     $(npm -v) \n" \
  "yarn version:    $(yarn -v) \n" \
  "debian version:  $(cat /etc/debian_version) \n" \
  "Chrome version:  $(google-chrome --version) \n" \
  "Firefox version: $(firefox --version) \n" \
  "Edge version:    $(microsoft-edge --version) \n" \
  "git version:     $(git --version) \n" \
  "whoami:          $(whoami) \n" 