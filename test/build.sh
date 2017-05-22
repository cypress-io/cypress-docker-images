set e+x

LOCAL_NAME=cypress/test

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
