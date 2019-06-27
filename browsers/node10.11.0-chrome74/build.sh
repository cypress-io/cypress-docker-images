set e+x

LOCAL_NAME=cypress/browsers:node10.11.0-chrome74

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
