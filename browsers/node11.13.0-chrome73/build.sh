set e+x

LOCAL_NAME=cypress/browsers:node11.13.0-chrome73

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
