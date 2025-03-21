#!/usr/bin/node
const { spawn } = require('child_process')

const yarnVersion = process.argv.slice(2)[0]

if (!yarnVersion) {
  console.log('No Yarn version provided, skipping Yarn install')
  process.exit(0)
}

if (yarnVersion >= '2') {
  console.log(`Yarn ${yarnVersion} is not supported, Yarn installation failed`)
  process.exit(1)
}

console.log('Installing Yarn version: ', yarnVersion)

// Insert logic here if needed to run a different install script based on version.
const install = spawn(`${__dirname}/default.sh`, [yarnVersion], { stdio: 'inherit' })

install.on('error', function (error) {
  console.log('child process errored with ' + error.toString())
  process.exit(1)
})

install.on('exit', function (code) {
  console.log('child process exited with code ' + code.toString())
  process.exit(code)
})
