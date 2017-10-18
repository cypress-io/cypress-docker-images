set e+x

# build image with Cypress dependencies
LOCAL_NAME=zolika84/cypress-node-8.7:1.0.2

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
