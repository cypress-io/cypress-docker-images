set e+x

LOCAL_NAME=cypress/browsers:node12.18.3-chrome83-ff77

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
