set e+x

LOCAL_NAME=cypress/included:3.3.0

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
