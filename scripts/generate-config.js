const path = require('path')
const fs = require('fs')
const os = require('os')

const imageType = process.argv[2]
const versionTag = process.argv[3]

if (!imageType) {
  console.error('expected an image type like included')
  process.exit(1)
}

if (!versionTag) {
  console.error('expected Cypress version argument like 3.8.3')
  process.exit(1)
}

const circleHeader = fs.readFileSync(path.join(__dirname, 'includes', 'circle-header.yml')).toString()

const splitImageFolderName = (folderName) => {
  const [name, tag] = folderName.split('/')
  return { name, tag }
}

const getImageType = (imageType) => {
  return imageType.includes('base') ? 'base' : imageType.includes('browser') ? 'browser' : 'included'
}

const sanitizedImageType = getImageType(imageType)

const getDockerArchFromNodeArch = (nodeArch) => {
  if (nodeArch === 'arm64') return 'linux/arm64'
  if (nodeArch === 'x64') return 'linux/amd64'
  throw new Error(`unrecognized arch in getDockerArchFromNodeArch: ${nodeArch}`)
}

const formWorkflow = (image) => {
  let yml = `    build-${sanitizedImageType}-images:
        jobs:`

  const arches = ['arm64', 'x64']

  for (const arch of arches) {
    yml +=
      os.EOL +
      `            - build-${sanitizedImageType}-image:
                name: "build+test ${sanitizedImageType} ${image.tag} ${arch}"
                dockerTag: "${image.tag}"
                resourceClass: ${arch === 'arm64' ? 'arm.large' : 'large'}
                platformArg: ${getDockerArchFromNodeArch(arch)}`

    // add browser versions
    if (sanitizedImageType === 'browser') {
      if (image.tag.includes('-chrome')) {
        yml =
          yml +
          `
                chromeVersion: "Google Chrome ${image.tag.match(/-chrome\d*/)[0].substring(7)}"`
      }

      if (image.tag.includes('-ff')) {
        yml =
          yml +
          `
                firefoxVersion: "Mozilla Firefox ${image.tag.match(/-ff\d*/)[0].substring(3)}"`
      }

      if (image.tag.includes('-edge')) {
        yml =
          yml +
          `
                edgeVersion: "Microsoft Edge"`
      }
    }
  }

  yml +=
    os.EOL +
    `            - push-images:
                name: "push ${sanitizedImageType} ${image.tag} images"
                dockerName: 'cypress/${sanitizedImageType === 'browser' ? 'browsers' : sanitizedImageType}'
                dockerTag: '${image.tag}'
                workingDirectory: '~/project/${sanitizedImageType === 'browser' ? 'browsers' : sanitizedImageType}/${
      image.tag
    }'
                context: test-runner:docker-push
                requires:`

  for (const arch of arches) {
    yml += os.EOL + `                    - "build+test ${sanitizedImageType} ${image.tag} ${arch}"`
  }

  return yml
}

const writeConfigFile = (image) => {
  const workflow = formWorkflow(image)
  const text = circleHeader.trim() + os.EOL + workflow
  fs.writeFileSync('circle.yml', text, 'utf8')
  console.log('Generated circle.yml')
}

const outputFolder = path.join(imageType, versionTag)
console.log('** outputFolder : %s', outputFolder)

const image = splitImageFolderName(outputFolder)
console.log('** image : %s \n', image)

writeConfigFile(image)
