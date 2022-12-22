const { isAValidImageScope } = require("../utils")
const shelljs = require("shelljs")

const scope = process.argv[2]
const version = process.argv[3]

if (!scope || !isAValidImageScope(scope)) {
  console.error('expected a valid scope like "base", "browsers" or "included"')
  process.exit(1)
}

if (!version) {
  console.error("expected the image version like node13.6.0-chrome79-ff72")
  process.exit(1)
}

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
})

readline.question(`Do you want to commit this change? (y/n)`, (answer) => {
  if (answer.match(/^y(es)?$/i)) {
    // execute bash script with scope & version
    shelljs.exec(`sh scripts/create-commit.sh ${scope} ${version}`)
  }
  readline.close()
})
