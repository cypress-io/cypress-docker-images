# WARNING: this file was autogenerated by generate-included-image.js
# using
#   npm run add:included -- 12.1.0 cypress/browsers:node16.16.0-chrome105-ff104-edge
set e+x

LOCAL_NAME=cypress/included:12.1.0
echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
