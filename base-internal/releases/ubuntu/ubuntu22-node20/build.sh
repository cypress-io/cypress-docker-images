set e+x

# build image with Cypress dependencies
LOCAL_NAME=cypress/base-internal:ubuntu22-node20

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME --platform linux/amd64 .
