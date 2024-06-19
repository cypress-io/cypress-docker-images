set e+x

LOCAL_NAME=cypress/browsers-internal:node18.17.0-chrome118-ff115
echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
