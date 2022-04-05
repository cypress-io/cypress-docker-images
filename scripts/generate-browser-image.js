const path = require("path")
const fs = require("fs")
const shelljs = require("shelljs")
const { isStrictSemver } = require("../utils")

const nodeVersion = process.argv[2]
const chromeVersion = process.argv.find((arg) => arg.includes("--chrome"))?.match(/(?<=--chrome=).*?(?=\s|$)/g)[0]
const firefoxVersion = process.argv.find((arg) => arg.includes("--firefox"))?.match(/(?<=--firefox=).*?(?=\s|$)/g)[0]
const edgeVersion = process.argv.find((arg) => arg.includes("--edge"))

if (!nodeVersion || !isStrictSemver(nodeVersion)) {
  console.error("expected a base image version like 16.5.0")
  process.exit(1)
}

if (!chromeVersion && !firefoxVersion && !edgeVersion) {
  console.error("expected at least one browser version like --chrome=94.0.4606.71")
  process.exit(1)
}

const generateNodeVersionFolderName = `node${nodeVersion}`
const generateChromeVersionFolderName = chromeVersion
  ? `-chrome${chromeVersion.substring(0, chromeVersion.indexOf("."))}`
  : ""

const generateFirefoxVersionFolderName = firefoxVersion
  ? `-ff${firefoxVersion.substring(0, firefoxVersion.indexOf("."))}`
  : ""
const generateEdgeVersionFolderName = edgeVersion ? `-edge` : ""
const imageVersion = `${generateNodeVersionFolderName}${generateChromeVersionFolderName}${generateFirefoxVersionFolderName}${generateEdgeVersionFolderName}`

let outputFolder = path.join("browsers", imageVersion)

//if same <imageVersion> folder already exists, add new folder named <imageVersion>-<baseImageTag>
if (shelljs.test("-d", outputFolder)) {
  console.log('existing folder "%s" found', outputFolder)
  outputFolder = path.join("browsers", `${imageVersion}-slim`)
}
console.log('creating "%s"', outputFolder)
shelljs.mkdir(outputFolder)

const folderName = outputFolder.split("/")[1]

const chromeDownload = `
# install Chrome browser
RUN wget --no-verbose -O /usr/src/google-chrome-stable_current_amd64.deb "http://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${chromeVersion}-1_amd64.deb" && \\
  dpkg -i /usr/src/google-chrome-stable_current_amd64.deb ; \\
  apt-get install -f -y && \\
  rm -f /usr/src/google-chrome-stable_current_amd64.deb`

const firefoxDownload = `
# firefox dependencies
RUN apt-get update && \\
  apt-get install -y \\
  bzip2 \\
  # add codecs needed for video playback in firefox
  # https://github.com/cypress-io/cypress-docker-images/issues/150
  mplayer

# install Firefox browser
RUN wget --no-verbose -O /tmp/firefox.tar.bz2 https://download-installer.cdn.mozilla.net/pub/firefox/releases/${firefoxVersion}/linux-x86_64/en-US/firefox-${firefoxVersion}.tar.bz2 && \\
  tar -C /opt -xjf /tmp/firefox.tar.bz2 && \\
  rm /tmp/firefox.tar.bz2 && \\
  ln -fs /opt/firefox/firefox /usr/bin/firefox`

const edgeDownload = `
RUN echo "Downloading Latest Edge version..."

## Setup Edge
RUN curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
RUN install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/
RUN sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge-dev.list'
RUN rm microsoft.gpg

## Install Edge
RUN apt-get update
RUN apt-get install -y microsoft-edge-dev
# Add a link to the browser that allows Cypress to find it
RUN ln -s /usr/bin/microsoft-edge /usr/bin/edge`

const Dockerfile = `
# WARNING: this file was autogenerated by ${path.basename(__filename)}
# using
#   yarn add:browser -- ${nodeVersion} ${process.argv
  .filter((arg, i) => i > 2)
  .map((arg) => arg)
  .join(" ")}
#
# build this image with command
#   docker build -t cypress/browsers:${folderName} .
#
#
FROM cypress/base:${nodeVersion}

USER root

RUN node --version

# Install dependencies
RUN apt-get update && \\
  apt-get install -y \\
  fonts-liberation \\
  libcurl4 \\
  libcurl3-gnutls \\
  libcurl3-nss \\
  xdg-utils \\
  wget \\
  curl \\
  # clean up
  && rm -rf /var/lib/apt/lists/* \\
  && apt-get clean

# install libappindicator3-1 - not included with Debian 11
RUN wget --no-verbose /usr/src/libappindicator3-1_0.4.92-7_amd64.deb "http://ftp.us.debian.org/debian/pool/main/liba/libappindicator/libappindicator3-1_0.4.92-7_amd64.deb" && \\
  dpkg -i /usr/src/libappindicator3-1_0.4.92-7_amd64.deb ; \\
  apt-get install -f -y && \\
  rm -f /usr/src/libappindicator3-1_0.4.92-7_amd64.deb

${chromeVersion ? chromeDownload : ""}

# "fake" dbus address to prevent errors
# https://github.com/SeleniumHQ/docker-selenium/issues/87
ENV DBUS_SESSION_BUS_ADDRESS=/dev/null

${firefoxVersion ? firefoxDownload : ""}

${edgeVersion ? edgeDownload : ""}

# versions of local tools
RUN echo  " node version:    $(node -v) \\n" \\
  "npm version:     $(npm -v) \\n" \\
  "yarn version:    $(yarn -v) \\n" \\
  "debian version:  $(cat /etc/debian_version) \\n" \\
  "Chrome version:  ${chromeVersion ? `$(google-chrome --version) \\n" \\` : `n/a \\n" \\`}
  "Firefox version: ${firefoxVersion ? `$(firefox --version) \\n" \\` : `n/a \\n" \\`}
  "Edge version:    ${edgeVersion ? `$(edge --version) \\n" \\` : `n/a \\n" \\`} 
  "git version:     $(git --version) \\n" \\
  "whoami:          $(whoami) \\n"

# a few environment variables to make NPM installs easier
# good colors for most applications
ENV TERM=xterm
# avoid million NPM install messages
ENV npm_config_loglevel=warn
# allow installing when the main user is root
ENV npm_config_unsafe_perm=true
`

const dockerFilename = path.join(outputFolder, "Dockerfile")
fs.writeFileSync(dockerFilename, Dockerfile.trim() + "\n", "utf8")
console.log("Saved %s", dockerFilename)

const README = `
<!--
WARNING: this file was autogenerated by ${path.basename(__filename)} using

    yarn add:browser -- ${nodeVersion} ${process.argv
  .filter((arg, i) => i > 2)
  .map((arg) => arg)
  .join(" ")}
-->

# cypress/browsers:${folderName}

A complete image with all operating system depedencies for Cypress, and Chrome ${chromeVersion}, Firefox ${firefoxVersion}, Edge ${edgeVersion} browsers.

[Dockerfile](Dockerfile)

**Note:** this image uses the \`root\` user. You might want to switch to nonroot user like \`node\` when running this container for security
`

const readmeFilename = path.join(outputFolder, "README.md")
fs.writeFileSync(readmeFilename, README.trim() + "\n", "utf8")
console.log("Saved %s", readmeFilename)

// to make building images simpler and to follow the same pattern as previous builds
const buildScript = `
# WARNING: this file was autogenerated by ${path.basename(__filename)}
# using
#   yarn add:browser -- ${nodeVersion} ${process.argv
  .filter((arg, i) => i > 2)
  .map((arg) => arg)
  .join(" ")}
set e+x

LOCAL_NAME=cypress/browsers:${folderName}
echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .
`

const buildFilename = path.join(outputFolder, "build.sh")
fs.writeFileSync(buildFilename, buildScript.trim() + "\n", "utf8")
shelljs.chmod("a+x", buildFilename)
console.log("Saved %s \n", buildFilename)

console.log(
  `Please add the newly generated folder ${outputFolder} to Git. Build the Docker container locally to make sure it is correct. \n`,
)

// GENERATE BROWSER CONFIG
require("child_process").fork(__dirname + "/generate-config.js", ["browser", folderName])

// GENERATE BROWSER README & UPDATE CHANGELOG
require("child_process").fork(__dirname + "/generate-browser-readme.js", [
  `cypress/browsers:${folderName}`,
  `--chrome=${chromeVersion} --firefox=${firefoxVersion} --edge=${edgeVersion}`,
])

// ASK USER IF THEY WANT TO COMMIT CHANGES
require("child_process").fork(__dirname + "/generate-commit.js", ["browsers", folderName])
