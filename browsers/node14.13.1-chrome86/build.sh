set e+x

LOCAL_NAME=cypress/browsers:node14.13.1-chrome86

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .