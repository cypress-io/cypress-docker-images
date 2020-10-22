set e+x

LOCAL_NAME=cypress/browsers:node12.18.4-edge88

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
