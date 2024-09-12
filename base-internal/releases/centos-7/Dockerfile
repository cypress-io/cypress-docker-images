# build it with command
#   docker build -t cypress/centos7-builder . --platform linux/amd64 .
#
FROM centos:7

# Update repo URLs to point to vault.centos.org
RUN     for repo in /etc/yum.repos.d/*.repo; do \
            sed -i 's|mirrorlist=|#mirrorlist=|g' $repo; \
            sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' $repo; \
            sed -i 's|http://mirror.centos.org|http://vault.centos.org|g' $repo; \
        done && yum clean all

# Install centos-release-scl to get the SCL repositories
RUN     yum -y install centos-release-scl

# Update repo URLs to point to vault.centos.org again
RUN     for repo in /etc/yum.repos.d/CentOS-SCLo-scl*.repo; do \
            sed -i 's|mirrorlist=|#mirrorlist=|g' $repo; \
            sed -i 's|# baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' $repo; \
            sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' $repo; \
            sed -i 's|http://mirror.centos.org|http://vault.centos.org|g' $repo; \
        done && yum clean all

# Install dependencies for building the addon and setting devtoolset-8 as the default compiler
RUN yum -y install curl python3 make atk-devel atk java-atk-wrapper at-spi2-atk gtk3 libXt libdrm mesa-libgbm Xvfb devtoolset-8-gcc devtoolset-8-gcc-c++ gcc openssl-devel bzip2-devel libffi-devel zlib-devel
RUN echo >> /etc/profile.d/devtoolset-8.sh 'source scl_source enable devtoolset-8'
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
RUN echo >> /etc/profile.d/nvm.sh 'source ~/.nvm/nvm.sh'
RUN curl -o Python-3.8.0.tgz https://www.python.org/ftp/python/3.8.0/Python-3.8.0.tgz
RUN tar xvf Python-3.8.0.tgz
RUN cd Python-3.8.0 && ./configure --enable-optimizations --prefix=/usr && make altinstall
RUN rm /usr/bin/python3 && ln -s /usr/bin/python3.8 /usr/bin/python3
# Node 16 is the most recent version that supports CentOS 7. We only need it to call the
# build script for lib/addon, so there should be minimal risk of security issues.
RUN source ~/.nvm/nvm.sh && nvm install 16.20.2 && npm install -g yarn
