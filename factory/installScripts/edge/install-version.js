#!/usr/bin/node
const { exec } = require('child_process');

const edgeVersion = process.argv.slice(2)[0]

if (!edgeVersion) {
  console.log('No Edge version provided, skipping Edge install')
  return
}

if (process.arch === 'arm64') {
  console.log('Not downloading Edge since we are on arm64: https://techcommunity.microsoft.com/t5/discussions/edge-for-linux-arm64/m-p/1532272')
  return;
}

console.log('EDGE_VERSION', edgeVersion)

// Insert logic here if needed to run a different install script based on edge version.
exec(`${__dirname}/default.sh ${edgeVersion}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    process.exit(1);
  }

  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
})

