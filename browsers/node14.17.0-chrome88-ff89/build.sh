set e+x

LOCAL_NAME=cypress/browsers:node14.17.0-chrome88-ff89

echo "Building $LOCAL_NAME"
docker build --no-cache -t $LOCAL_NAME .
