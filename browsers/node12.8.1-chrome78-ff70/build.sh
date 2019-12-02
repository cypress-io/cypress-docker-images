set e+x

LOCAL_NAME=cypress/browsers:node12.8.1-chrome78-ff70

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
