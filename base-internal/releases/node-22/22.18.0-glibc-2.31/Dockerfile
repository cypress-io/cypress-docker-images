# build it with command
#   docker build -t cypress/base-internal:22.18.0-glibc-2.31 --platform linux/amd64 .
#
FROM cypress/base-internal:22.18.0-bullseye

RUN apt-get update && \
  apt-get install -y \
  wget \
  xz-utils \
  bzip2 \
  make \
  autoconf \
  gcc-multilib \
  g++-multilib \
  # clean up
  && rm -rf /var/lib/apt/lists/* \
  && apt-get clean

  # # Install Python 3.8
  # # Bullseye comes with 3.9, so we need to downgrade
RUN wget https://www.python.org/ftp/python/3.8.0/Python-3.8.0.tgz
RUN tar xvf Python-3.8.0.tgz
RUN cd Python-3.8.0 && ./configure --enable-optimizations --prefix=/usr && make altinstall
RUN rm /usr/bin/python3 && ln -s /usr/bin/python3.8 /usr/bin/python3
  # # Clean up
RUN rm -rf Python-3.8.0 Python-3.8.0.tgz
