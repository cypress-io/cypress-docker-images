set e+x

# build image with Cypress dependencies
LOCAL_NAME=cypress/base:8.9.3

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
