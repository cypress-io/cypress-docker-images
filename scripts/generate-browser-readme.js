const fs = require("fs")
const path = require("path")

const baseImageTag = process.argv[2]
const chromeVersion = process.argv
  .find((arg) => arg.includes("--chrome"))
  ?.substring(process.argv.find((arg) => arg.includes("--chrome")).indexOf("=") + 1)
const firefoxVersion = process.argv
  .find((arg) => arg.includes("--firefox"))
  ?.substring(process.argv.find((arg) => arg.includes("--firefox")).indexOf("=") + 1)
const edgeVersion = process.argv
  .find((arg) => arg.includes("--edge"))
  ?.substring(process.argv.find((arg) => arg.includes("--edge")).indexOf("=") + 1)

if (!baseImageTag) {
  console.error('expected base Docker image tag like "cypress/browsers:node12.6.0-chrome77"')
  process.exit(1)
}
if (!baseImageTag.startsWith("cypress/browsers:")) {
  console.error('expected the base Docker image tag to be one of "cypress/browsers:*"')
  console.error('but it was "%s"', baseImageTag)
  process.exit(1)
}

if (!chromeVersion && !firefoxVersion && !edgeVersion) {
  console.error("expected at least one browser version like --chrome=94.0.4606.71")
  process.exit(1)
}

const ReadMeDockerPulls = `
# cypress/browsers

[![Docker Pulls](https://img.shields.io/docker/pulls/cypress/browsers.svg?maxAge=604800)](https://hub.docker.com/r/cypress/browsers/)

> Docker image with all operating system dependencies and some pre-installed browsers, **but NOT Cypress itself**. See [cypress/included](../included) images if you need Cypress pre-installed in the image.
`

const ReadMeInstructions = `
To find the available Chrome versions, check [https://chromium.cypress.io/](https://chromium.cypress.io/).

## Naming scheme

Each Docker image is named \`cypress/browsers:node<full Node version>-chrome<Chrome major version>\`. If the image has Firefox browser, then it is named \`cypress/browsers:node<full Node version>-chrome<Chrome major version>-ff<Firefox major version>\`.

## Other images

Other (older) images:

- Node 8 + Chrome 65 + Firefox 57 [/chrome65-ff57](chrome65-ff57)
- Node 8 + Chrome 67 + Firefox 57 [/chrome67-ff57](chrome67-ff57)
- Node 8 + Chrome 67 [/chrome67](chrome67)
- Node 8.2.1 + Chrome 73 [/node8.2.1-chrome73](node8.2.1-chrome73)
- Node 8.9.3 + Chrome 73 [/node8.9.3-chrome73](node8.9.3-chrome73)
- Node 8.9.3 + Chrome 76 + Firefox 68 [/node8.9.3-npm6.10.1-chrome76-ff68](node8.9.3-npm6.10.1-chrome76-ff68)
- Node 8.15.1 + Chrome 73 [/node8.15.1-chrome73](node8.15.1-chrome73)
- Node 10 + Chrome 69 [/chrome69](chrome69)
- Node 10.2.1 + Chrome 74 [/node10.2.1-chrome74](node10.2.1-chrome74)
- Node 10.11.0 + Chrome 75 [/node10.11.0-chrome75](node10.11.0-chrome75)
- Node 10.16.0 + Chrome 76 [/node10.16.0-chrome75](node10.16.0-chrome76)
- Node 10.16.0 + Chrome 77 [/node10.16.0-chrome77](node10.16.0-chrome77)
- Node 11.13.0 + Chrome 73 [/node11.13.0-chrome73](node11.13.0-chrome73)
- Node 12.0.0 + Chrome 73 [/node12.0.0-chrome73](node12.0.0-chrome73)
- Node 12.0.0 + Chrome 73 + Firefox 68 [/node12.0.0-chrome73-ff68](node12.0.0-chrome73-ff68)
- Node 12.0.0 + Chrome 75 [/node12.0.0-chrome75](node12.0.0-chrome75)
- Node 12.6.0 + Chrome 77 [/node12.6.0-chrome77](node12.6.0-chrome77)
- [/node12.13.0-chrome78-ff70-brave78](node12.13.0-chrome78-ff70-brave78)
- Node 13.1.0 + Chrome 78 + Firefox 70 [node13.1.0-chrome78-ff70](node13.1.0-chrome78-ff70)
- Node 13.3.0 + Chrome 79 + Firefox 70 [node13.3.0-chrome79-ff70](node13.3.0-chrome79-ff70)

We only provide browsers for \`Debian\`, but you can use our base images and build your own. See Cypress [Docker documentation](https://on.cypress.io/docker).

## Tags

You can find all published image tags in the tables above or at [Docker Hub](https://hub.docker.com/r/cypress/browsers/tags/). We recommend using a full image tag, rather than \`latest\` for immutable builds.

\`\`\`
# NOT RECOMMENDED
FROM cypress/browsers:latest

# Best practice
FROM cypress/browsers:node13.6.0-chrome80-ff72
\`\`\``

const generateBaseVersion = baseImageTag.substring(baseImageTag.indexOf("node") + 4, baseImageTag.indexOf("-"))

const generateBrowserVersion = (version) => {
  return version ? version : `🚫`
}

const generateNewChangeVersion = `[${baseImageTag}](./${baseImageTag.substring(
  baseImageTag.indexOf("node"),
)}) | \`cypress/base:${generateBaseVersion}\` | \`${generateBrowserVersion(
  chromeVersion,
)}\` | \`${generateBrowserVersion(firefoxVersion)}\` | \`${generateBrowserVersion(edgeVersion)}\``

const changeLogPath = path.resolve("browsers", "CHANGELOG.md")
const readmePath = path.resolve("browsers", "README.md")

fs.readFile(changeLogPath, (err, data) => {
  if (err) {
    console.error(err)
  }

  const updatedChangeLog = `${data.toString()} \n${generateNewChangeVersion}`
  fs.writeFileSync(changeLogPath, updatedChangeLog.trim() + "\n", "utf8")
  console.log("Saved CHANGELOG.md at %s", changeLogPath)

  const readme = `${ReadMeDockerPulls} \n ${updatedChangeLog} \n ${ReadMeInstructions}`
  fs.writeFileSync(readmePath, readme.trim() + "\n", "utf8")
  console.log("Saved README.md at %s", readmePath)
})
