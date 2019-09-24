set e+x

LOCAL_NAME=cypress/browsers:node12.0.0-chrome73

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
