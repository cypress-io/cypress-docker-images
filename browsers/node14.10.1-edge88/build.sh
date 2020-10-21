set e+x

LOCAL_NAME=cypress/browsers:node14.10.1-edge88

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
