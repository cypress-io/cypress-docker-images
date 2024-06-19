set e+x

# build image with Cypress dependencies
LOCAL_NAME=cypress/base-internal:18.17.0

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
