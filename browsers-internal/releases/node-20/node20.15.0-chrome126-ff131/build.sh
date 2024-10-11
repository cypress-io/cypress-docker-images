set e+x

LOCAL_NAME=cypress/browsers-internal:node20.15.0-chrome126-ff31
echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
