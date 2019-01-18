set e+x

LOCAL_NAME=cypress/browsers:chrome71

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
