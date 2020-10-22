# to test cypress/included images on CircleCI machines
# we need a newer Node version (by default it is Node v6!)
# this example taken from
# https://discuss.circleci.com/t/switch-nodejs-version-on-machine-executor-solved/26675/2
export NVM_DIR="/opt/circleci/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
