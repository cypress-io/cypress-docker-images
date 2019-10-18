set e+x

echo "Testing Docker image with cypress included"
echo "First, deleting existing dir /tmp/test if exists"

rm -rf /tmp/test || true
cd /tmp
mkdir test
cd test
npm init --yes
npm i -D cypress
npx @bahmutov/cly init
rm -rf package-lock.json package.json node_modules

echo "Testing Electron browser"
docker run -it -v $PWD:/e2e -w /e2e cypress/included:3.4.2

echo "Testing Chrome browser"
docker run -it -v $PWD:/e2e -w /e2e cypress/included:3.4.2 --browser chrome
