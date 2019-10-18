set e+x

LOCAL_NAME=cypress/browsers:node12.12.0-chrome77

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
