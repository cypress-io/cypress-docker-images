set e+x

LOCAL_NAME=cypress/browsers:chrome67

echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
