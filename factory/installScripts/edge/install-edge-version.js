#!/usr/bin/node
const { spawn } = require('child_process')

const edgeVersion = process.argv.slice(2)[0]

if (!edgeVersion) {
  console.log('No Edge version provided, skipping Edge install')
  process.exit(0)
}

if (process.arch !== 'x64') {
  console.log('Not downloading Edge since we are not on x64. For arm64 status see https://techcommunity.microsoft.com/t5/discussions/edge-for-linux-arm64/m-p/1532272')
  process.exit(0)
}

console.log('Installing Edge version: ', edgeVersion)

// Insert logic here if needed to run a different install script based on edge version.
const install = spawn(`${__dirname}/default.sh`, [edgeVersion], { stdio: 'inherit' })

install.on('error', function (error) {
  console.log('child process errored with ' + error.toString())
  process.exit(1)
})

install.on('exit', function (code) {
  console.log('child process exited with code ' + code.toString())
  process.exit(code)
})
