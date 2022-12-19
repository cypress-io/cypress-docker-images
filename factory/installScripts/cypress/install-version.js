#!/usr/bin/node
const { exec } = require('child_process');

const cypressVersion = process.argv.slice(2)[0]

if (!cypressVersion) {
  console.log('No Cypress version provided, skipping Cypress install')
  return
}

console.log('Installing Cypress version ', cypressVersion)

// Insert logic here if needed to run a different install script based on chrome version.
exec(`${__dirname}/default.sh ${cypressVersion}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    process.exit(1);
  }

  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
})
