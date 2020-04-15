set e+x

LOCAL_NAME=cypress/browsers:node12.16.2-chrome81-ff75

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
