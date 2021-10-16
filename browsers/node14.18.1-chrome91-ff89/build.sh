set e+x

LOCAL_NAME=cypress/browsers:node14.18.1-chrome91-ff89

echo "Building $LOCAL_NAME"
docker build --no-cache -t $LOCAL_NAME .
