# WARNING: this file was autogenerated by generate-browser-image.js
# using
#   yarn add:browser -- 14.17.0 --chrome=99.0.4844.51 --firefox=98.0
set e+x

LOCAL_NAME=cypress/browsers:node14.17.0-chrome99-ff98-slim
echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
