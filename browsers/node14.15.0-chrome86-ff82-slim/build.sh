# WARNING: this file was autogenerated by generate-browser-image.js
# using
#   yarn add:browsers -- 14.15.0 --chrome=86.0.4240.193 --firefox=82.0.3
set e+x

LOCAL_NAME=cypress/browsers:node14.15.0-chrome86-ff82-slim
echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
