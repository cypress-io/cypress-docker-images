# WARNING: this file was autogenerated by generate-browser-image.js
# using
#   yarn add:browser -- 16.17.0 --chrome=105.0.5195.125
set e+x

LOCAL_NAME=cypress/browsers:node16.17.0-chrome105-slim
echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
