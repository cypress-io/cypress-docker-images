set e+x

# build image with Cypress dependencies
LOCAL_NAME=cypress/base-internal:18.18.2

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
