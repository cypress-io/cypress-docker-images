set e+x

LOCAL_NAME=cypress/browsers-internal:node18.18.2-chrome125-ff126
echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
