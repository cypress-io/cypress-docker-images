const fs = require("fs")
const path = require("path")
const { isStrictSemver } = require("../utils")

const versionTag = process.argv[2]
const baseImageTag = process.argv[3]

if (!versionTag || !isStrictSemver(versionTag)) {
  console.error('expected Cypress version argument like "9.4.1"')
  process.exit(1)
}

if (!baseImageTag) {
  console.error('expected base Docker image tag like "cypress/browsers:node12.6.0-chrome77"')
  process.exit(1)
}

if (!baseImageTag.startsWith("cypress/browsers:")) {
  console.error('expected the base Docker image tag to be one of "cypress/browsers:*"')
  console.error('but it was "%s"', baseImageTag)
  process.exit(1)
}

const ReadMeDockerPulls = `
# cypress/included

[![Docker Pulls](https://img.shields.io/docker/pulls/cypress/included.svg?maxAge=604800)](https://hub.docker.com/r/cypress/included/)

> Docker images with all operating system dependencies, Cypress, and some pre-installed browsers.
`

const ReadMeInstructions = `
This image should be enough to run Cypress tests headlessly or in the interactive mode with a single Docker command like this:

\`\`\`shell
$ docker run -it -v $PWD:/e2e -w /e2e cypress/included:9.4.1
\`\`\`

## Debug

If you want to see the [Cypress debug logs](https://on.cypress.io/debugging#Print-DEBUG-logs) during the run, pass environment variable \`DEBUG\`:

\`\`\`shell
$ docker run -it -v $PWD:/e2e -w /e2e -e DEBUG=cypress:* cypress/included:9.4.1
  cypress:cli:cli cli starts with arguments ["/usr/local/bin/node","/usr/local/bin/cypress","run"] +0ms
  cypress:cli NODE_OPTIONS is not set +0ms
  cypress:cli:cli program parsing arguments +3ms
  ...
\`\`\`

## Arguments

These images have its entry point set to \`cypress run\` without any additional arguments. You can specify additional Cypress CLI arguments after the image name. For example to print the Help menu for the \`cypress run\` command:

\`\`\`shell
$ docker run -it --entrypoint=cypress cypress/included:9.4.1 --help
\`\`\`

To run a single spec using Chrome browser:

\`\`\`shell
$ docker run -it --entrypoint=cypress cypress/included:9.4.1 --spec cypress/integration/spec-a.js --browser chrome
\`\`\`

## Entry

These images have its entry point set to \`cypress run\`. If you want to run a different command, you need to set \`--entrypoint=cypress\` and specify arguments AFTER the image name. For example, to print the Cypress information using \`cypress info\` command

\`\`\`shell
$ docker run -it --entrypoint=cypress cypress/included:9.4.1 info
Displaying Cypress info...

Detected 2 browsers installed:

1. Chrome
  - Name: chrome
  - Channel: stable
  - Version: 80.0.3987.116
  - Executable: google-chrome

2. Firefox
  - Name: firefox
  - Channel: stable
  - Version: 74.0
  - Executable: firefox

Note: to run these browsers, pass <name>:<channel> to the '--browser' field

Examples:
- cypress run --browser firefox
- cypress run --browser chrome

Learn More: https://on.cypress.io/launching-browsers

Proxy Settings: none detected
Environment Variables:
CYPRESS_CACHE_FOLDER: /root/.cache/Cypress

Application Data: /root/.config/cypress/cy/development
Browser Profiles: /root/.config/cypress/cy/development/browsers
Binary Caches: /root/.cache/Cypress

Cypress Version: 9.4.1
System Platform: linux (Debian - 10.1)
System Memory: 2.09 GB free 285 MB
\`\`\`

### Entry with arguments

If you want to provide Cypress command line arguments, specify the entry point and the arguments. For example to run tests with recording and parallel mode using custom build ID "abc123" we can use:

\`\`\`shell
$ docker run -it --entrypoint=cypress cypress/included:9.4.1 \
  run --record --parallel --ci-build-id abc123
\`\`\`

## Keep the container

Every time you run \`docker run\` you spawn a new container. That container then stops after the tests finish, but there is nothing Cypress can do about it - it is the Docker command \`docker run ...\` that controls this behavior.

If you are running a lot of tests again and again, you might start the container once using Bash as the entrypoint, instead of the default \`cypress\` command. Then you can execute the \`cypress run\` or any other commands, while still in the same container:

\`\`\`
$ docker run -it -v $PWD:/e2e -w /e2e \
  --entrypoint=/bin/bash cypress/included:9.4.1
# we are inside the container
# let's run the tests
root@814ed01841fe:/e2e# cypress run
....
# run the tests again
root@814ed01841fe:/e2e# cypress run
\`\`\`

## Browser

If you want to use a different browser (assuming it is installed in the container) use:

\`\`\`shell
$ docker run -it -v $PWD:/e2e -w /e2e --entrypoint=cypress cypress/included:9.4.1 run --browser chrome

============================================================

  (Run Starting)

  ┌─────────────────────────────────
  │ Cypress:    3.8.1
  │ Browser:    Chrome 77
  │ Specs:      1 found (spec.js)
  └─────────────────────────────────

  ...
\`\`\`

For more information, read [Run Cypress with a single Docker command](https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/) and [End-to-End Testing Web Apps: The Painless Way](https://mtlynch.io/painless-web-app-testing/)

## Default user

By default, the included images run as \`root\` user. You can switch the user to the second user in the image \`node\` or custom-mapped user, see [examples section](https://github.com/cypress-io/cypress-docker-images#examples). Starting with \`cypress/included:3.8.1\` we set permissions on the globally installed Cypress and set binary cache variable to allow other users read and execute access. Thus you will be able to run Cypress as non-root user by using \`-u node\`

\`\`\`shell
$ docker run -it -v $PWD/src:/test -w /test -u node cypress/included:9.4.1
\`\`\`

## Building and testing

To build a new image use command from the root of the repo

\`\`\`shell
$ npm run add:included -- <Cypress version> <cypress/base:image>
# example
$ npm run add:included -- 9.4.1 cypress/browsers:node13.6.0-chrome80-ff72
\`\`\`

You should also update the \`circle.yml\` file after creating the new image with

\`\`\`shell
$ npm run build
\`\`\`

You can test the new image by creating a new project and running headless tests. For example:

\`\`\`shell
cd /tmp
mkdir test
cd test
npm init --yes
npm i -D cypress
npx @bahmutov/cly init
rm -rf package-lock.json package.json node_modules
docker run -it -v $PWD:/e2e -w /e2e cypress/included:9.4.1
\`\`\`

**Tip:** the above commands are in the file [test.sh](test.sh)

The tests should finish successfully using local image. Now push the image to the Docker hub

\`\`\`shell
docker push cypress/included:9.4.1
\`\`\`

## GitHub Action

You can quickly run your tests in GitHub Actions using these images, see [cypress-gh-action-included](https://github.com/bahmutov/cypress-gh-action-included) repository.

## GitLab CI

You can use the included images to run Cypress tests on GitLab CI, see how in [cypress-example-included](https://gitlab.com/cypress-io/cypress-example-included) repository.

## Wait-on

If you want to run Cypress after a server has started, we suggest using [wait-on](https://github.com/jeffbski/wait-on#readme) utility. To use it from the \`cypress/included\` image, you need to disable the default entrypoint and set a new command like this:

\`\`\`shell
# execute the Cypress container once
docker run --rm \ # remove container after finish
  -v ./e2e:/e2e \ # map current folder to "e2e" folder
  --workdir=/e2e \
  --entrypoint="" \ # remove default entrypoint command
  cypress/included:9.4.1 \
  # wait for the local site to respond
  # then run Cypress tests
  /bin/bash -c 'npx wait-on http://127.0.0.1:3000 && cypress run'
\`\`\`

## Restrict CPU

If you want to simulate slow container, run the Docker container with \`--cpus\` parameter, for example, let's debug the browser detection problems when the CPU is (very) slow:

\`\`\`shell
docker run -it -v $PWD:/e2e -w /e2e --cpus=0.02 \
  -e DEBUG=cypress:launcher --entrypoint=cypress \
  cypress/included:9.4.1 info
\`\`\`
`

const changeLogPath = path.resolve("included", "CHANGELOG.md")
const readmePath = path.resolve("included", "README.md")

fs.readFile(changeLogPath, (err, data) => {
  if (err) {
    console.error(err)
  }

  const imageExists = data.includes(versionTag)

  if (imageExists) {
    console.log(`Image already exists in README and CHANGELOG.`)
    process.exit(1)
  }

  const updatedChangeLog = `${data.toString()}[cypress/included:${versionTag}](${versionTag}) | \`${baseImageTag}\``

  fs.writeFileSync(changeLogPath, updatedChangeLog.trim() + "\n", "utf8")
  console.log("Saved CHANGELOG.md at %s", changeLogPath)

  const readme = `${ReadMeDockerPulls}\n${updatedChangeLog}\n${ReadMeInstructions}`

  fs.writeFileSync(readmePath, readme.trim() + "\n", "utf8")
  console.log("Saved README.md at %s", readmePath)
})
