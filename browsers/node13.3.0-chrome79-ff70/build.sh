set e+x

LOCAL_NAME=cypress/browsers:node13.3.0-chrome79-ff70

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
