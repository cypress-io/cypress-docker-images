set e+x

LOCAL_NAME=cypress/internal:cy-0.19.4

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
