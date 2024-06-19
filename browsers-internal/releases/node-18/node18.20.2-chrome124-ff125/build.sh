set e+x

LOCAL_NAME=cypress/browsers-internal:node18.20.2-chrome124-ff125
echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
