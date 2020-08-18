FROM cypress/base:12.0.0

RUN apt-get update && \
  apt-get install -y \
  libgbm-dev \
  # clean up
  && rm -rf /var/lib/apt/lists/*

# versions of local tools
RUN echo  " node version:    $(node -v) \n" \
  "npm version:     $(npm -v) \n" \
  "yarn version:    $(yarn -v) \n" \
  "debian version:  $(cat /etc/debian_version) \n" \
  "user:            $(whoami) \n"
