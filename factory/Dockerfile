ARG NODE_VERSION
ARG CHROME_VERSION
ARG CYPRESS_VERSION


FROM node:${NODE_VERSION}-slim AS base

RUN npm --version \
  && node -p process.version \
  && node -p 'module.paths' \
  && echo  " node version:    $(node -v) \n" \
    "npm version:     $(npm -v) \n" \
    "yarn version:    $(yarn -v) \n" \
    "debian version:  $(cat /etc/debian_version) \n" \
    "user:            $(whoami) \n"


FROM base AS chrome

RUN apt-get update \
  apt-get install wget \
  wget --no-verbose -O /usr/src/google-chrome-stable_current_amd64.deb "http://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_107.0.5304.121-1_amd64.deb" && \
  dpkg -i /usr/src/google-chrome-stable_current_amd64.deb ; \
  apt-get install -f -y && \
  rm -f /usr/src/google-chrome-stable_current_amd64.deb

# RUN node -p "process.arch === 'arm64' ? 'Not downloading Chrome since we are on arm64: https://crbug.com/677140' : process.exit(1)" || \
#   (apt-get update \
#   wget --no-verbose -O /usr/src/google-chrome-stable_current_amd64.deb "http://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_107.0.5304.121-1_amd64.deb" && \
#   dpkg -i /usr/src/google-chrome-stable_current_amd64.deb ; \
#   apt-get install -f -y && \
#   rm -f /usr/src/google-chrome-stable_current_amd64.deb)


# FROM base as final
# # COPY --from=chrome
# RUN npm install -g "cypress@${CYPRESS_VERSION}" \
