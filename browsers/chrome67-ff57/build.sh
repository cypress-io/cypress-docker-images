set e+x

LOCAL_NAME=cypress/browsers:chrome67-ff57

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
