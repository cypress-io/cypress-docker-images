# WARNING: this file was autogenerated by generate-included-image.js
# using
#   npm run add:included -- 8.1.0 cypress/browsers:node14.16.0-chrome90-ff88
set e+x

LOCAL_NAME=cypress/included:8.1.0
echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
