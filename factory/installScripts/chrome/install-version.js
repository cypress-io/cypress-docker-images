#!/usr/bin/node
const { exec } = require('child_process');

const chromeVersion = process.argv.slice(2)[0]

if (!chromeVersion) {
  console.log('No Chrome version provided, skipping Chrome install')
  return
}

if (process.arch === 'arm64') {
  console.log('Not downloading Chrome since we are on arm64: https://crbug.com/677140')
  return;
}

console.log('CHROME_VERSION', chromeVersion)

// TODO: switch to spawn to stream stdout
// Insert logic here if needed to run a different install script based on chrome version.
exec(`${__dirname}/default.sh ${chromeVersion}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    process.exit(1);
  }

  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
})
