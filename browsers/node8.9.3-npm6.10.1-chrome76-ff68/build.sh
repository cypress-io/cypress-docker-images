set e+x

LOCAL_NAME=cypress/browsers:node8.9.3-npm6.10.1-chrome76-ff-68

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
