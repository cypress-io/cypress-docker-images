set e+x

LOCAL_NAME=cypress/example

echo "Running tests against $LOCAL_NAME"
echo "Running as a non-root user 'node'"

# print the docker command before running
set -x
# if you want to see diagnostic messages add argument -e DEBUG=cypress:cli
docker run -it -v $PWD/src:/test -w /test -u node $LOCAL_NAME

# for exploration
# docker run -it -v $PWD/src:/test -w /test -u node \
  # --entrypoint /bin/bash $LOCAL_NAME
