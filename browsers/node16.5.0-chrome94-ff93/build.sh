set e+x

LOCAL_NAME=cypress/browsers:node16.5.0-chrome94-ff93

echo "Building $LOCAL_NAME"
docker build --no-cache -t $LOCAL_NAME .