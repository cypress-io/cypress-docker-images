set e+x

LOCAL_NAME=cypress/internal:chrome61

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
