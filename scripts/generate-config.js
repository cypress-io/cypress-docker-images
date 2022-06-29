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

const awsCodeBuildPreamble = `version: 0.2
env:
    variables:
        PUBLIC_ECR_ALIAS: "cypress-io"

batch:
    fast-fail: false
    build-list:`

const awsCodeBuildPostamble = `phases:
    pre_build:
        commands:
            - aws --version
            - echo Check if $IMAGE_TAG is in ECR...
            - ./find-ecr-image.sh $IMAGE_REPO_NAME $IMAGE_TAG -p
            - echo Logging in to Amazon ECR...
            - aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com
            - aws ecr-public get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin public.ecr.aws/$PUBLIC_ECR_ALIAS
    build:
        commands:
            - echo Building the Docker image...
            - cd $IMAGE_DIR/$IMAGE_TAG
            - docker build -t $IMAGE_REPO_NAME:$IMAGE_TAG .
            - docker tag $IMAGE_REPO_NAME:$IMAGE_TAG public.ecr.aws/$PUBLIC_ECR_ALIAS/$IMAGE_REPO_NAME:$IMAGE_TAG
    post_build:
        commands:
            - echo Pushing the Docker image...
            - docker push public.ecr.aws/$PUBLIC_ECR_ALIAS/$IMAGE_REPO_NAME:$IMAGE_TAG
`

const circleHeader = fs.readFileSync(path.join(__dirname, 'includes', 'circle-header.yml')).toString()

const splitImageFolderName = (folderName) => {
  const [name, tag] = folderName.split("/")
  return { name, tag }
}

const getImageType = (image) => {
  return image.name.includes("base") ? "base" : image.name.includes("browser") ? "browser" : "included"
}
const formWorkflow = (image) => {
  let yml = `    build-${getImageType(image)}-images:
        jobs:`

  for (const arch of ['arm64', 'x64']) {
    yml += os.EOL + `            - build-${getImageType(image)}-image:
                name: "build+test ${getImageType(image)} ${image.tag} ${arch}"
                dockerTag: "${image.tag}"
                resourceClass: ${arch === 'arm64' ? 'arm.large' : 'large'}
                platformArg: ${arch === 'arm64' ? 'linux/arm64' : 'linux/amd64'}`

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
                context: test-runner:docker-push
                requires:
                    - "build+test ${getImageType(image)} ${image.tag} x64"
                    - "build+test ${getImageType(image)} ${image.tag} arm64"`

  return yml
}

const formAwsBuildWorkflow = (image) => {
  const identifier = camelCase(`${image.name}${image.tag}`)
  const imageFolder = image.name === "browser" ? "browsers" : image.name
  const job = `        - identifier: ${identifier}
          env:
            image: aws/codebuild/standard:5.0
            type: LINUX_CONTAINER
            privileged-mode: true
            compute-type: BUILD_GENERAL1_MEDIUM
            variables:
                IMAGE_REPO_NAME: "cypress/${imageFolder}"
                IMAGE_DIR: "${imageFolder}"
                IMAGE_TAG: "${image.tag}"\n`
  return job
}

const writeConfigFile = (image) => {
  const workflow = formWorkflow(image)
  const text = circleHeader.trim() + os.EOL + workflow
  fs.writeFileSync("circle.yml", text, "utf8")
  console.log("Generated circle.yml")
}

const writeBuildSpecConfigFile = (image) => {
  const workflow = formAwsBuildWorkflow(image)
  const text = awsCodeBuildPreamble.trim() + os.EOL + workflow + os.EOL + awsCodeBuildPostamble.trim()
  fs.writeFileSync("buildspec.yml", text, "utf8")
  console.log("Generated buildspec.yml \n")
}

const outputFolder = path.join(imageType, versionTag)
console.log("** outputFolder : %s", outputFolder)

const image = splitImageFolderName(outputFolder)
console.log("** image : %s \n", image)

writeConfigFile(image)
writeBuildSpecConfigFile(image)
