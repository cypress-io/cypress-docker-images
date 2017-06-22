set e+x

LOCAL_NAME=cypress/internal:xvfb

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
