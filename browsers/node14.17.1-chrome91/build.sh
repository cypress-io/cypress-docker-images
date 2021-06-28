set e+x

LOCAL_NAME=cypress/browsers:node14.17.1-chrome91

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
