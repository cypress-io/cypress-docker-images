set e+x

# build image with Cypress dependencies
LOCAL_NAME=cypress/base-internal:22.15.1-bullseye-glibc-2.31

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME . --platform linux/amd64
