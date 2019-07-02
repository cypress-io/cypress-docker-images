set e+x

echo Testing Docker image with cypress included

cd /tmp
mkdir test
cd test
npm init --yes
npm i -D cypress
npx @bahmutov/cly init
rm -rf package-lock.json package.json node_modules
docker run -it -v $PWD:/e2e -w /e2e cypress/included:3.3.2
