FROM cypress/browsers:node12.13.0-chrome78-ff70

# should be root user to install
RUN whoami
RUN node --version

# install Brave browser
# https://brave-browser.readthedocs.io/en/latest/installing-brave.html#linux
RUN apt install apt-transport-https curl -y
RUN curl -s https://brave-browser-apt-release.s3.brave.com/brave-core.asc | apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-release.gpg add -
RUN echo "deb [arch=amd64] https://brave-browser-apt-release.s3.brave.com/ trusty main" | tee /etc/apt/sources.list.d/brave-browser-release-trusty.list
RUN apt update -y
RUN apt install brave-browser -y

# versions of local tools
RUN echo  " node version:    $(node -v) \n" \
  "npm version:     $(npm -v) \n" \
  "yarn version:    $(yarn -v) \n" \
  "debian version:  $(cat /etc/debian_version) \n" \
  "git version:     $(git --version) \n" \
  "Chrome version:  $(google-chrome --version) \n" \
  "Firefox version: $(firefox --version) \n" \
  "Brave version:   $(brave-browser --version) \n"
