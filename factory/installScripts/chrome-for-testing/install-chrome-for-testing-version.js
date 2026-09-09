#!/usr/bin/node
const { spawn } = require('child_process')

const chromeVersion = process.argv.slice(2)[0]

if (!chromeVersion) {
  console.log('No Chrome for Testing version provided, skipping Chrome for Testing install')
  process.exit(0)
}

const chromeMajorVersion = chromeVersion.split('.').map(Number)[0]

const architecture = process.arch
let platformFilename

switch (architecture) {
  case 'x64':
    platformFilename = 'linux64'
    break
  case 'arm64':
    platformFilename = 'linux-arm64'
    if (chromeMajorVersion >= 153) {
      break
    }
    else {
      console.log(`Chrome for Testing ${chromeVersion} not available for arm64, minimum 153 required, skipping download`)
      process.exit(0)
    }
  // eslint-disable-next-line no-fallthrough
  default:
    console.log(`Unsupported architecture ${architecture} for Chrome for Testing ${chromeVersion}, skipping download`)
    process.exit(0)
}

console.log(`Installing Chrome for Testing version ${chromeVersion} for ${architecture}`)

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
