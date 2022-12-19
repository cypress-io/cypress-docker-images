#! /bin/bash

# The following is borrowed from
set -ex \
  && savedAptMark="$(apt-mark showmanual)" \
  && apt-get update && apt-get install -y ca-certificates curl wget gnupg dirmngr --no-install-recommends \
  && rm -rf /var/lib/apt/lists/* \
  && for key in \
    6A010C5166006599AA17F08146C2130DFD2497F5 \
  ; do \
    gpg --batch --keyserver hkps://keys.openpgp.org --recv-keys "$key" || \
    gpg --batch --keyserver keyserver.ubuntu.com --recv-keys "$key" ; \
  done \
  && curl -fsSLO --compressed "https://yarnpkg.com/downloads/$1/yarn-v$1.tar.gz" \
  && curl -fsSLO --compressed "https://yarnpkg.com/downloads/$1/yarn-v$1.tar.gz.asc" \
  && gpg --batch --verify yarn-v$1.tar.gz.asc yarn-v$1.tar.gz \
  && mkdir -p /opt \
  && tar -xzf yarn-v$1.tar.gz -C /opt/ \
  && ln -s /opt/yarn-v$1/bin/yarn /usr/local/bin/yarn \
  && ln -s /opt/yarn-v$1/bin/yarnpkg /usr/local/bin/yarnpkg \
  && rm yarn-v$1.tar.gz.asc yarn-v$1.tar.gz \
  && apt-mark auto '.*' > /dev/null \
  && { [ -z "$savedAptMark" ] || apt-mark manual $savedAptMark > /dev/null; } \
  && find /usr/local -type f -executable -exec ldd '{}' ';' \
    | awk '/=>/ { print $(NF-1) }' \
    | sort -u \
    | xargs -r dpkg-query --search \
    | cut -d: -f1 \
    | sort -u \
    | xargs -r apt-mark manual \
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && yarn --version
