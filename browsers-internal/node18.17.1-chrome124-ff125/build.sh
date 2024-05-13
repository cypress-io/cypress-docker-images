set e+x

LOCAL_NAME=cypress/browsers-internal:node18.17.1-chrome124-ff125
echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
