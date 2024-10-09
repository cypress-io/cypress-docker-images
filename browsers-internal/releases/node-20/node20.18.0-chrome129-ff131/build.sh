set e+x

LOCAL_NAME=cypress/browsers-internal:node20.18.0-chrome129-ff131
echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
