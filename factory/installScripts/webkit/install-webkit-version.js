#!/usr/bin/node
const { spawn } = require('child_process')

const webkitVersion = process.argv.slice(2)[0]

if (!webkitVersion) {
  console.log('No Webkit version provided, skipping Webkit install')
  process.exit(0)
}

if (!['arm64', 'x64'].includes(process.arch)) {
  console.log(`Not downloading Webkit since we are on ${process.arch}`)
  process.exit(0)
}

console.log('Installing Webkit version: ', webkitVersion)

// Insert logic here if needed to run a different install script based on webkit version.
const install = spawn(`${__dirname}/default.sh`, [webkitVersion], { stdio: 'inherit' })

install.on('error', function (error) {
  console.log('child process errored with ' + error.toString())
  process.exit(1)
})

install.on('exit', function (code) {
  console.log('child process exited with code ' + code.toString())
  process.exit(code)
})
