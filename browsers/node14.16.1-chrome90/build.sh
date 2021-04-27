set e+x

LOCAL_NAME=cypress/browsers:node14.16.1-chrome90

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
