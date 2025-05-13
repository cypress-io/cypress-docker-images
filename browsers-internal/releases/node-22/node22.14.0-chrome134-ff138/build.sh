set e+x

LOCAL_NAME=cypress/browsers-internal:node22.14.0-chrome134-ff138
echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME . 