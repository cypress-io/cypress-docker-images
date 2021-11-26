set e+x

LOCAL_NAME=cypress/browsers:node14.15.0-chrome96-ff94

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
