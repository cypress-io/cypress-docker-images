set e+x

LOCAL_NAME=cypress/included:3.6.0

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
