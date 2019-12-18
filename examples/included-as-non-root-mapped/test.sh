set e+x

LOCAL_NAME=cypress/example

echo "Running tests against $LOCAL_NAME"
echo "Running as a non-root user 'appuser' mapped to host user"
# print the docker command before running
set -x
docker run -it -v $PWD/src:/test -w /test -u appuser $LOCAL_NAME
