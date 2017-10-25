set e+x

LOCAL_NAME=cypress/browsers:chrome62

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
