set e+x

LOCAL_NAME=cypress/browsers:node16.13.0-chrome95

echo "Building $LOCAL_NAME"
docker build --no-cache -t $LOCAL_NAME .
