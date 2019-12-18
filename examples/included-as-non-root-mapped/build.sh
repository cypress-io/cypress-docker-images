set e+x

LOCAL_NAME=cypress/example

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
