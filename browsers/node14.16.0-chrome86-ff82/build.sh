set e+x

LOCAL_NAME=cypress/browsers:node14.16.0-chrome86-ff82

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
