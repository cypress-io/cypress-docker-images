set e+x

LOCAL_NAME=cypress/browsers:node18.15.0-chrome114-ff115
echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
