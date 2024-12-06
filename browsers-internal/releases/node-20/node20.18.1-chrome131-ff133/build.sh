set e+x

LOCAL_NAME=cypress/browsers-internal:node20.18.1-chrome131-ff133
echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
