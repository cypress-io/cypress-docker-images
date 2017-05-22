set e+x

LOCAL_NAME=cypress/test

echo "Running tests against $LOCAL_NAME"
docker run -it -v $PWD/src:/test -w /test $LOCAL_NAME
