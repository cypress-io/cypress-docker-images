set e+x

# build image with Cypress dependencies
LOCAL_NAME=cypress/base:10.18.1

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
