set e+x

LOCAL_NAME=cypress/browsers-internal:node18.15.0-chrome114-ff115-edge
echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
