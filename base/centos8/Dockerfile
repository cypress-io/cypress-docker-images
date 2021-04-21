FROM centos:8

# Update and install Cypress dependencies, Node.js
RUN yum update -y && \
    yum -y install gcc-c++ make wget && \
    curl -sL https://rpm.nodesource.com/setup_current.x | bash - && \
    yum install -y nodejs && \
    npm install yarn -g && \
    yum -y install \
        xorg-x11-server-Xvfb \
        xorg-x11-xauth \
        gtk3-3.22* \
        libXtst* \
        libXScrnSaver* \
        GConf2* \
        nss* \
        alsa-lib* && \
    yum clean all && rm -rf /var/cache/yum
