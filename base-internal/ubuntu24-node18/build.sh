set e+x

# build image with Cypress dependencies
LOCAL_NAME=cypress/base-internal:ubuntu24-node18

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
