set e+x

LOCAL_NAME=cypress/browsers:node13.6.0-chrome-80-ff72

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
