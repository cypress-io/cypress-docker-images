set e+x

LOCAL_NAME=cypress/browsers:node16.0.0-chrome91-ff89

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
