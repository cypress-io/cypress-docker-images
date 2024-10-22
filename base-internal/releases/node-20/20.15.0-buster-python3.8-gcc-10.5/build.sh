set e+x

# build image with Cypress dependencies
LOCAL_NAME=cypress/base-internal:20.15.0-buster-python3.8-gcc-10.5

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
