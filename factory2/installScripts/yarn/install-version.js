#!/usr/bin/node
const { exec } = require('child_process');

const yarnVersion = process.argv.slice(2)[0]

if (!yarnVersion) {
  console.log('No Yarn version provided, skipping Yarn install')
  return
}

console.log('YARN_VERSION', yarnVersion)

// Insert logic here if needed to run a different install script based on version.
if ( yarnVersion ) {
  exec(`${__dirname}/default.sh ${yarnVersion}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      process.exit(1);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  })
}
