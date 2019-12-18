set e+x

# build image with Cypress dependencies
LOCAL_NAME=cypress/base:13.3.0

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
