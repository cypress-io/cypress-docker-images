set e+x

LOCAL_NAME=cypress/browsers:node10.16.3-chrome77

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
