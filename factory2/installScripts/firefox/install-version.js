#!/usr/bin/node
const { exec } = require('child_process');

const firefoxVersion = process.argv.slice(2)[0]

if (!firefoxVersion) {
  console.log('No Firefox version provided, skipping Firefox install')
  return
}

if (process.arch === 'arm64') {
  console.log('Not downloading Firefox since we are on arm64: https://bugzilla.mozilla.org/show_bug.cgi?id=1678342')
  return
}

console.log('Installing firefox version ', firefoxVersion)

// Insert logic here if needed to run a different install script based on chrome version.
exec(`${__dirname}/default.sh ${firefoxVersion}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    process.exit(1);
  }

  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
})
