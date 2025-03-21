#!/usr/bin/node
const { spawn } = require('child_process')

const chromeVersion = process.argv.slice(2)[0]

if (!chromeVersion) {
  console.log('No Chrome version provided, skipping Chrome install')
  process.exit(0)
}

if (process.arch !== 'x64') {
  console.log('Not downloading Chrome since we are not on x64. For arm64 status see https://crbug.com/677140')
  process.exit(0)
}

console.log('Installing Chrome version: ', chromeVersion)

// Insert logic here if needed to run a different install script based on chrome version.
const install = spawn(`${__dirname}/default.sh`, [chromeVersion], { stdio: 'inherit' })

install.on('error', function (error) {
  console.log('child process errored with ' + error.toString())
  process.exit(1)
})

install.on('exit', function (code) {
  console.log('child process exited with code ' + code.toString())
  process.exit(code)
})
