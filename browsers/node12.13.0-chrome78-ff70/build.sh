set e+x

LOCAL_NAME=cypress/browsers:node12.13.0-chrome78-ff70

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
