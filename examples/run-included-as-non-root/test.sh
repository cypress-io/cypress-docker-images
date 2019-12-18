set e+x

LOCAL_NAME=cypress/example

echo "Running tests against $LOCAL_NAME"
docker run -it -v $PWD/src:/test -w /test -u node $LOCAL_NAME
