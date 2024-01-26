set e+x

LOCAL_NAME=cypress/browsers-internal:node18.16.0-chrome116-ff115-edge
echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
