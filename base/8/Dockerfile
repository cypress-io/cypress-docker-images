FROM node:8.11

RUN apt-get update && \
  apt-get install -y \
    libgtk2.0-0 \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    xvfb

RUN npm install npm@5.8.0 -g

# versions of local tools
RUN node -v
RUN npm -v
