FROM centos:7

# To find which package provides missing dependency, for example libXss.so
#   yum whatprovides libXss*
# and then install displayed answer like
#   yum install -y libXScrnSaver*

# install commands taken from
# https://tecadmin.net/install-latest-nodejs-and-npm-on-centos/
RUN yum install -y gcc-c++ make
RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -

# Install Node
RUN yum install -y nodejs
RUN node -v
RUN npm -v

# Install dependencies
RUN yum install -y xorg-x11-server-Xvfb
RUN yum install -y xorg-x11-xauth
# note:
#   Gtk2 for Cypress < 3.3.0
#   Gtk3 for Cypress >= 3.3.0
RUN yum install -y gtk2-2.24*
RUN yum install -y gtk3-3.22*
RUN yum install -y libXtst*
# provides libXss
RUN yum install -y libXScrnSaver*
# provides libgconf-2
RUN yum install -y GConf2*
# provides libasound
RUN yum install -y alsa-lib*

RUN npm install yarn -g

# there is some dependency I cannot figure out missing
# which gets installed when installing "git*"
RUN yum install -y git*

# versions of local tools
RUN echo  " node version:    $(node -v) \n" \
  "npm version:     $(npm -v) \n" \
  "yarn version:    $(yarn -v) \n" \
  "centOS version:  $(cat /etc/centos-release) \n" \
  "user:            $(whoami) \n"
