#!/bin/bash

docker pull cypress/browsers:node8.9.3-npm6.10.1-chrome76-ff68
docker run cypress/browsers:node8.9.3-npm6.10.1-chrome76-ff68 google-chrome --version
echo ""

docker pull cypress/browsers:node12.0.0-chrome75
docker run cypress/browsers:node12.0.0-chrome75 google-chrome --version
echo ""

docker pull cypress/browsers:node12.4.0-chrome76
docker run cypress/browsers:node12.4.0-chrome76 google-chrome --version
echo ""

docker pull cypress/browsers:node12.6.0-chrome75
docker run cypress/browsers:node12.6.0-chrome75 google-chrome --version
echo ""

docker pull cypress/browsers:node12.6.0-chrome77
docker run cypress/browsers:node12.6.0-chrome77 google-chrome --version
echo ""

docker pull cypress/browsers:node12.8.1-chrome78-ff70
docker run cypress/browsers:node12.8.1-chrome78-ff70 google-chrome --version
echo ""

docker pull cypress/browsers:node12.13.0-chrome78-ff70
docker run cypress/browsers:node12.13.0-chrome78-ff70 google-chrome --version
echo ""

docker pull cypress/browsers:node13.3.0-chrome79-ff70
docker run cypress/browsers:node13.3.0-chrome79-ff70 google-chrome --version
echo ""

docker pull cypress/browsers:node13.6.0-chrome-80-ff72
docker run cypress/browsers:node13.6.0-chrome-80-ff72 google-chrome --version
echo ""
