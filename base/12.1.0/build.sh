set e+x

# build image with Cypress dependencies
LOCAL_NAME=cypress/base:12.1.0

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
