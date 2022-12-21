#!/usr/bin/node
const { spawn } = require('child_process');

const yarnVersion = process.argv.slice(2)[0]

if (!yarnVersion) {
  console.log('No Yarn version provided, skipping Yarn install')
  return
}

console.log('Installing Yarn version: ', yarnVersion)

// Insert logic here if needed to run a different install script based on version.
const install = spawn(`${__dirname}/default.sh`, [yarnVersion])

install.stdout.on('data', function (data) {
  console.log(data.toString())
});

install.stderr.on('data', function (data) {
  console.log('stderr: ' + data.toString())
});

install.on('error', function (error) {
  console.log('child process errored with ' + error.toString())
  process.exit(1)
});

install.on('exit', function (code) {
  console.log('child process exited with code ' + code.toString())
  process.exit(code)
});
