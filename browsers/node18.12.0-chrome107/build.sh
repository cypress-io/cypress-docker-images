# WARNING: this file was autogenerated by generate-browser-image.js
# using
#   yarn add:browser -- 18.12.0 --chrome=107.0.5304.121
set e+x

LOCAL_NAME=cypress/browsers:node18.12.0-chrome107
echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
