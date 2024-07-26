set e+x

LOCAL_NAME=cypress/centos7-builder

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME --platform linux/amd64 .
