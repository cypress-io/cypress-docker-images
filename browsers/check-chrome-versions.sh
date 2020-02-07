#!/bin/bash

docker pull cypress/browsers:node8.9.3-npm6.10.1-chrome76-ff68
docker run cypress/browsers:node8.9.3-npm6.10.1-chrome76-ff68 google-chrome --version

docker pull cypress/browsers:node13.3.0-chrome-79-ff70
docker run cypress/browsers:node13.3.0-chrome-79-ff70 google-chrome --version
