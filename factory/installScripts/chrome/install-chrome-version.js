#!/usr/bin/node
const { spawn } = require('child_process')

const chromeVersion = process.argv.slice(2)[0]

if (!chromeVersion) {
  console.log('No Chrome version provided, skipping Chrome install')
  process.exit(0)
}

const chromeMajorVersion = chromeVersion.split('.').map(Number)[0]

const architecture = process.arch
let platformFilename

switch (architecture) {
  case 'x64':
    platformFilename = 'amd64'
    break
  case 'arm64':
    platformFilename = 'arm64'
    if (chromeMajorVersion >= 151) {
      break
    }
    else {
      console.log(`Chrome ${chromeVersion} not available for arm64, minimum 151 required, skipping download`)
      process.exit(0)
    }
  // eslint-disable-next-line no-fallthrough
  default:
    console.log(`Unsupported architecture ${architecture} for Chrome, skipping download`)
    process.exit(0)
}

console.log(`Installing Chrome version ${chromeVersion} for ${architecture}`)

// Insert logic here if needed to run a different install script based on chrome version.
const install = spawn(`${__dirname}/default.sh`, [chromeVersion, platformFilename], { stdio: 'inherit' })

install.on('error', function (error) {
  console.log('child process errored with ' + error.toString())
  process.exit(1)
})

install.on('exit', function (code) {
  console.log('child process exited with code ' + code.toString())
  process.exit(code)
})
