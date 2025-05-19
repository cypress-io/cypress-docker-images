# build this image with command
#   docker build -t cypress/browsers-internal:node20.19.1-bullseye-chrome132-ff138-edge --platform linux/amd64 .
#
FROM cypress/browsers-internal:node20.19.1-bullseye-chrome132-ff138

USER root

# install Microsoft Edge
RUN node -p "process.arch === 'arm64' ? 'Not downloading Edge since we are on arm64' : process.exit(1)" || \
  (wget --no-verbose -O /usr/src/microsoft-edge-stable_current_amd64.deb "https://packages.microsoft.com/repos/edge/pool/main/m/microsoft-edge-stable/microsoft-edge-stable_132.0.6834.210-1_amd64.deb" && \
  dpkg -i /usr/src/microsoft-edge-stable_current_amd64.deb ; \
  apt-get install -f -y && \
  rm -f /usr/src/microsoft-edge-stable_current_amd64.deb)

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