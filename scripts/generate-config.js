const path = require("path")
const fs = require("fs")
const { camelCase } = require("lodash")
const os = require("os")

const imageType = process.argv[2]
const versionTag = process.argv[3]

if (!imageType) {
  console.error("expected an image type like included")
  process.exit(1)
}

if (!versionTag) {
  console.error("expected Cypress version argument like 3.8.3")
  process.exit(1)
}

const circleHeader = fs.readFileSync(path.join(__dirname, 'includes', 'circle-header.yml')).toString()

const splitImageFolderName = (folderName) => {
  const [name, tag] = folderName.split("/")
  return { name, tag }
}

const getImageType = (image) => {
  return image.name.includes("base") ? "base" : image.name.includes("browser") ? "browser" : "included"
}

const getDockerArchFromNodeArch = (nodeArch) => {
  if (nodeArch === 'arm64') return 'linux/arm64'
  if (nodeArch === 'x64') return 'linux/amd64'
  throw new Error(`unrecognized arch in getDockerArchFromNodeArch: ${nodeArch}`)
}

const formWorkflow = (image) => {
  let yml = `    build-${getImageType(image)}-images:
        jobs:`

  const arches = ['arm64', 'x64']

  for (const arch of arches) {
    yml += os.EOL + `            - build-${getImageType(image)}-image:
                name: "build+test ${getImageType(image)} ${image.tag} ${arch}"
                dockerTag: "${image.tag}"
                resourceClass: ${arch === 'arm64' ? 'arm.large' : 'large'}
                platformArg: ${getDockerArchFromNodeArch(arch)}`

    // add browser versions
    if (getImageType(image) === "browser") {
        if (image.tag.includes("-chrome")) {
        yml =
            yml +
            `
                chromeVersion: "Google Chrome ${image.tag.match(/-chrome\d*/)[0].substring(7)}"`
        }

        if (image.tag.includes("-ff")) {
        yml =
            yml +
            `
                firefoxVersion: "Mozilla Firefox ${image.tag.match(/-ff\d*/)[0].substring(3)}"`
        }

        if (image.tag.includes("-edge")) {
        yml =
            yml +
            `
                edgeVersion: "Microsoft Edge"`
        }
    }
  }

  yml += os.EOL + `            - push-images:
                name: "push ${getImageType(image)} ${image.tag} images"
                dockerName: 'cypress/${getImageType(image)}'
                dockerTag: '${image.tag}'
                workingDirectory: '${getImageType(image)}/${image.tag}'
                buildxArches: '${arches.map(getDockerArchFromNodeArch).join(',')}'
                context: test-runner:docker-push
                requires:`

  for (const arch of arches) {
    yml += os.EOL + `                    - "build+test ${getImageType(image)} ${image.tag} ${arch}"`
  }

  return yml
}

const writeConfigFile = (image) => {
  const workflow = formWorkflow(image)
  const text = circleHeader.trim() + os.EOL + workflow
  fs.writeFileSync("circle.yml", text, "utf8")
  console.log("Generated circle.yml")
}

const outputFolder = path.join(imageType, versionTag)
console.log("** outputFolder : %s", outputFolder)

const image = splitImageFolderName(outputFolder)
console.log("** image : %s \n", image)

writeConfigFile(image)