set e+x

LOCAL_NAME=cypress/browsers:node12.20.0-slim-chrome86

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
