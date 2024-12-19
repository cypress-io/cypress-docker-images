set e+x

LOCAL_NAME=cypress/browsers-internal:node20.18.1-bullseye-chrome131-ff133-edge
echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
