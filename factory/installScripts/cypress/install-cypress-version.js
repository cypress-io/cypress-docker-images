#!/usr/bin/node
const { spawn } = require('child_process')

const cypressVersion = process.argv.slice(2)[0]

if (!cypressVersion) {
  console.log('No Cypress version provided, skipping Cypress install')
  process.exit(0)
}

console.log('Installing Cypress version ', cypressVersion)

// Insert logic here if needed to run a different install script based on cypress version.
const install = spawn(`${__dirname}/default.sh`, [cypressVersion], { stdio: 'inherit' })

install.on('error', function (error) {
  console.log('child process errored with ' + error.toString())
  process.exit(1)
})

install.on('exit', function (code) {
  console.log('child process exited with code ' + code.toString())
  process.exit(code)
})
