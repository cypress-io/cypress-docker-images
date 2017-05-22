set e+x

LOCAL_NAME=cypress/internal:chrome58

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
