set e+x

LOCAL_NAME=cypress/browsers-internal:node18.18.2-chrome120-ff115-edge
echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
