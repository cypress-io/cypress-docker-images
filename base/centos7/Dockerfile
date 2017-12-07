FROM centos:7

# To find which package provides missing dependency, for example libXss.so
#   yum whatprovides libXss*
# and then install displayed answer like
#   yum install -y libXScrnSaver*

# Install dependencies
RUN yum install -y xorg-x11-server-Xvfb
RUN yum install -y gtk2-2.24*
RUN yum install -y libXtst*
# provides libXss
RUN yum install -y libXScrnSaver*
# provides libgconf-2
RUN yum install -y GConf2*
# provides libasound
RUN yum install -y alsa-lib*

# Install Node
RUN yum install -y epel-release
RUN yum install -y nodejs-6.11.3
# comment out installing NPM 5 because fails
# with error:
#   Error: Cannot find module 'semver'
# RUN npm install -g npm@5
RUN node -v
RUN npm -v

# there is some dependency I cannot figure out missing
# which gets installed when installing "git*"
RUN yum install -y git*
