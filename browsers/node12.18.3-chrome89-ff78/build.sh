set e+x

LOCAL_NAME=cypress/browsers:node12.18.3-chrome89-ff78

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
