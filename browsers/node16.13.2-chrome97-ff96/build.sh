set e+x

LOCAL_NAME=cypress/browsers:node16.13.2-chrome97-ff96

echo "Building $LOCAL_NAME"
docker build --no-cache -t $LOCAL_NAME .
