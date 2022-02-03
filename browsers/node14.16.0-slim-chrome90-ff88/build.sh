set e+x

LOCAL_NAME=cypress/browsers:node14.16.0-slim-chrome90-ff88

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
