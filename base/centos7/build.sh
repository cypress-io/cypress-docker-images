set e+x

# build image with Cypress dependencies
LOCAL_NAME=cypress/base:centos7

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
