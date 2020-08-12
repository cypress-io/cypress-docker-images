set e+x

LOCAL_NAME=cypress/browsers:node14.7.0-chrome84

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
