#!/usr/bin/node
const { spawn } = require('child_process')

const firefoxVersion = process.argv.slice(2)[0]

if (!firefoxVersion) {
  console.log('No Firefox version provided, skipping Firefox install')
  process.exit(0)
}

const architecture = process.arch
let platformFilename

switch (architecture) {
  case 'x64':
    platformFilename = 'linux-x86_64'
    break
  case 'arm64':
    platformFilename = 'linux-aarch64'
    if (firefoxVersion >= '136.0') {
      break
    }
    else {
      console.log(`Firefox ${firefoxVersion} not available for arm64, minimum 136.0 required, skipping download`)
      process.exit(0)
    }
  // eslint-disable-next-line no-fallthrough
  default:
    console.log(`Unsupported architecture ${architecture} for Firefox, skipping download`)
    process.exit(0)
}

console.log(`Installing Firefox version ${firefoxVersion} for ${architecture}`)

// Change in compression from bz2 to xz in Firefox 135.0
// See https://www.mozilla.org/en-US/firefox/135.0/releasenotes/

let compression = 'bz2'

if (firefoxVersion >= '135.0') {
  compression = 'xz'
}

// Insert logic here if needed to run a different install script based on Firefox version.
const install = spawn(`${__dirname}/default.sh`, [firefoxVersion, compression, platformFilename], { stdio: 'inherit' })

install.on('error', function (error) {
  console.log('child process errored with ' + error.toString())
  process.exit(1)
})

install.on('exit', function (code) {
  console.log('child process exited with code ' + code.toString())
  process.exit(code)
})
