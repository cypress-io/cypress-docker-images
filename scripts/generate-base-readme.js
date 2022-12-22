const fs = require("fs")
const path = require("path")
const { isStrictSemver } = require("../utils")

const versionTag = process.argv[2]
const folderName = process.argv[3]

if (!versionTag || !isStrictSemver(versionTag)) {
  console.error('expected version tag argument like "16.5.0"')
  process.exit(1)
}

const ReadMeDockerPulls = `
# cypress/base

[![Docker Pulls](https://img.shields.io/docker/pulls/cypress/base.svg?maxAge=604800)](https://hub.docker.com/r/cypress/base/)

> Docker images that include all operating system dependencies necessary to run Cypress, **but NOT Cypress itself** and no pre-installed browsers. See [cypress/included](../included) images if you need Cypress pre-installed in the image. See [cypress/browsers](../browsers) images if you need some browsers pre-installed in the image.

Each tag is in a sub folder, named after Node version or OS it is built on.

Image \`cypress/base:12\` is tagged [\`latest\`](https://hub.docker.com/r/cypress/base/tags/)

> **Note** All Base Images install the latest versions of NPM & Yarn.
`

const ReadMeInstructions = `
## ⚠️ Node.js Support

Cypress 4.0+ no longer supports Node.js versions below 8.0.0. See our [Migration Guide](https://on.cypress.io/migration-guide#Node-js-8-support).

Using 6.x images is not recommended, and we do not plan to release new versions of Cypress tested on Node.js below 8.0.0.

## Information

Node release schedule at [nodejs/Release](https://github.com/nodejs/Release) and one can find LTS versions using [nvm](https://github.com/creationix/nvm) tool

\`\`\`text
nvm ls-remote | grep LTS
...
  v8.16.1   (LTS: Carbon)
  v8.16.2   (LTS: Carbon)
  v8.17.0   (Latest LTS: Carbon)
...
  v10.18.0   (LTS: Dubnium)
  v10.18.1   (LTS: Dubnium)
  v10.19.0   (Latest LTS: Dubnium)
...
  v12.14.1   (LTS: Erbium)
  v12.15.0   (LTS: Erbium)
  v12.16.0   (Latest LTS: Erbium)
\`\`\``

const Notes = `

## Notes

<div id="note1">

**1:** this image includes fonts with Chinese characters`

const generateNewChangeVersion = `| cypress/base:${folderName} | ${versionTag} | Debian | [/${versionTag}](${versionTag}) | \`🚫\` | \`🚫\` | \`🚫\` |`

const changeLogPath = path.resolve("base", "CHANGELOG.md")
const readmePath = path.resolve("base", "README.md")

fs.readFile(changeLogPath, (err, data) => {
  if (err) {
    console.error(err)
  }

  const imageExists = data.includes(generateNewChangeVersion)

  if (imageExists) {
    console.log(`Image already exists in README and CHANGELOG.`)
    process.exit(1)
  }

  const updatedChangeLogImages = `${data.toString().replace(Notes, '')}${generateNewChangeVersion}`
  const updatedChangeLog = `${updatedChangeLogImages}${Notes}`
  fs.writeFileSync(changeLogPath, updatedChangeLog.trim() + "\n", "utf8")
  console.log("Saved CHANGELOG.md at %s", changeLogPath)

  const readme = `${ReadMeDockerPulls}\n${updatedChangeLogImages}\n${ReadMeInstructions}${Notes}`
  fs.writeFileSync(readmePath, readme.trim() + "\n", "utf8")
  console.log("Saved README.md at %s", readmePath)
})
