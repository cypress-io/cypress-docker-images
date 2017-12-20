set e+x

LOCAL_NAME=cypress/browsers:firefox57

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
