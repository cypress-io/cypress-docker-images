# WARNING: this file was autogenerated by generate-browser-image.js
# using
#   yarn add:browser -- 16.18.0 --chrome=107.0.5304.68 --firefox=106.0.1 --edge
set e+x

LOCAL_NAME=cypress/browsers:node16.18.0-chrome107-ff106-edge
echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
