#! /bin/bash

groupadd --gid 1000 node \
  && useradd --uid 1000 --gid node --shell /bin/bash --create-home node

# The following is borrowed from https://github.com/nodejs/docker-node/blob/main/20/bookworm-slim/Dockerfile
# Node.js GPG keys are taken from https://github.com/nodejs/node/
# Tweaked for gpg proxy management
ARCH= && dpkgArch="$(dpkg --print-architecture)" \
    && case "${dpkgArch##*-}" in \
      amd64) ARCH='x64';; \
      ppc64el) ARCH='ppc64le';; \
      s390x) ARCH='s390x';; \
      arm64) ARCH='arm64';; \
      armhf) ARCH='armv7l';; \
      i386) ARCH='x86';; \
      *) echo "unsupported architecture"; exit 1 ;; \
    esac \
    && set -ex \
    && savedAptMark="$(apt-mark showmanual)" \
    && apt-get update && apt-get install -y curl wget gnupg dirmngr xz-utils libatomic1 --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && curl -fsSLO https://raw.githubusercontent.com/nodejs/release-keys/main/gpg/pubring.kbx \
    && gpg --no-default-keyring --keyring ./pubring.kbx --export | gpg --import \
    && curl -fsSLO --compressed "https://nodejs.org/dist/v$1/node-v$1-linux-$ARCH.tar.xz" \
    && curl -fsSLO --compressed "https://nodejs.org/dist/v$1/SHASUMS256.txt.asc" \
    && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
    && grep " node-v$1-linux-$ARCH.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
    && tar -xJf "node-v$1-linux-$ARCH.tar.xz" -C /usr/local --strip-components=1 --no-same-owner \
    && rm "node-v$1-linux-$ARCH.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt pubring.kbx \
    && rm -rf ~/.gnupg \
    && apt-mark auto '.*' > /dev/null \
    && { [ -z "$savedAptMark" ] || apt-mark manual $savedAptMark > /dev/null; } \
    && find /usr/local -type f -executable -exec ldd '{}' ';' \
      | awk '/=>/ { so = $(NF-1); if (index(so, "/usr/local/") == 1) { next }; gsub("^/(usr/)?", "", so); print so }' \
      | sort -u \
      | xargs -r dpkg-query --search \
      | cut -d: -f1 \
      | sort -u \
      | xargs -r apt-mark manual \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs \
    && node --version \
    && npm --version
