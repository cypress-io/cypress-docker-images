#!/usr/bin/node
const { spawn } = require('child_process')

const geckodriverVersion = process.argv.slice(2)[0]

if (!geckodriverVersion) {
  console.log('No geckodriver version provided, skipping geckodriver install')
  process.exit(0)
}

// See https://firefox-source-docs.mozilla.org/testing/geckodriver/Support.html for compatibility matrix
// geckodriver < 0.34.0 only supports up to Firefox 120, which is no longer supported by Cypress
const MIN_GECKO = '0.34.0'

if (geckodriverVersion < MIN_GECKO) {
  console.log(`geckodriver version ${geckodriverVersion} provided, minimum version ${MIN_GECKO} required, skipping geckodriver install`)
  process.exit(0)
}

const architecture = process.arch
// Platform filenames taken from https://github.com/mozilla/geckodriver/releases
let platformFilename

switch (architecture) {
  case 'x64':
    platformFilename = 'linux64'
    break
  case 'arm64':
    platformFilename = 'linux-aarch64'
    break

  // eslint-disable-next-line no-fallthrough
  default:
    console.log(`Unsupported architecture ${architecture} for geckodriver installation, skipping install`)
    process.exit(0)
}

console.log(`Installing geckodriver version ${geckodriverVersion} for ${architecture}`)

// Insert logic here if needed to run a different install script based on geckodriver version.
const install = spawn(`${__dirname}/default.sh`, [geckodriverVersion, platformFilename], { stdio: 'inherit' })

install.on('error', function (error) {
  console.log('child process errored with ' + error.toString())
  process.exit(1)
})

install.on('exit', function (code) {
  console.log('child process exited with code ' + code.toString())
  process.exit(code)
})
