set e+x

LOCAL_NAME=cypress/browsers:node12.13.0-chrome80-ff74

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
