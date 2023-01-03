#!/usr/bin/node
const { spawn } = require('child_process');

const webkitVersion = process.argv.slice(2)[0]

if (!webkitVersion) {
  console.log('No Webkit version provided, skipping Webkit install')
  return
}

// TODO: Verify that we don't have an arm64 version of webkit
if (process.arch === 'arm64') {
  console.log('Not downloading Webkit since we are on arm64')
  return;
}

console.log('Installing Webkit version: ', webkitVersion)

// Insert logic here if needed to run a different install script based on webkit version.
const install = spawn(`${__dirname}/default.sh`, [webkitVersion])

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
