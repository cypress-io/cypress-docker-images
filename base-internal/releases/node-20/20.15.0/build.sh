set e+x

# build image with Cypress dependencies
LOCAL_NAME=cypress/base-internal:20.15.0

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
