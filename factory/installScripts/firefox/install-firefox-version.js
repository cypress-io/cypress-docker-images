#!/usr/bin/node
const { spawn } = require('child_process');

const firefoxVersion = process.argv.slice(2)[0]

if (!firefoxVersion) {
  console.log('No Firefox version provided, skipping Firefox install')
  return
}

if (process.arch === 'arm64') {
  console.log('Not downloading Firefox since we are on arm64: https://bugzilla.mozilla.org/show_bug.cgi?id=1678342')
  return
}

console.log('Installing Firefox version: ', firefoxVersion)

// Insert logic here if needed to run a different install script based on chrome version.
const install = spawn(`${__dirname}/default.sh`, [firefoxVersion], {stdio: 'inherit'})

install.on('error', function (error) {
  console.log('child process errored with ' + error.toString())
  process.exit(1)
});

install.on('exit', function (code) {
  console.log('child process exited with code ' + code.toString())
  process.exit(code)
});
