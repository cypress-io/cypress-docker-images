set e+x

LOCAL_NAME=cypress/included:3.4.1

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
