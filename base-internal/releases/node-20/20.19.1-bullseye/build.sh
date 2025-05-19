set e+x

# build image with Cypress dependencies
LOCAL_NAME=cypress/base-internal:20.19.1-bullseye

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
