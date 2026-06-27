// Checks the latest published `cypress` version on the npm registry against
// the `CYPRESS_VERSION` currently pinned in `factory/.env`. When npm is ahead,
// the `.env` file is rewritten in place so a `cypress/included` image can be
// published for the new version (see CONTRIBUTING.md > Publishing images).
//
// Designed to run with zero dependencies on Node 20+ (uses global `fetch`).
//
// Usage:
//   node scripts/check-cypress-version.mjs            # check + update factory/.env
//   node scripts/check-cypress-version.mjs --check    # report only, never write
//   node scripts/check-cypress-version.mjs 15.18.1    # force a specific version
//
// When run inside GitHub Actions, the result is also written to $GITHUB_OUTPUT
// as `updated`, `version` and `previous` for downstream steps to consume.

import { readFile, writeFile, appendFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ENV_PATH = resolve(__dirname, '..', 'factory', '.env')
const NPM_LATEST_URL = 'https://registry.npmjs.org/cypress/latest'
const VERSION_RE = /^(\d+)\.(\d+)\.(\d+)$/

const parseArgs = (argv) => {
  const args = argv.slice(2)
  const checkOnly = args.includes('--check')
  const forced = args.find(arg => !arg.startsWith('--'))

  return { checkOnly, forced }
}

// Returns > 0 when `a` is newer than `b`, so we never bump backwards.
const compareVersions = (a, b) => {
  const pa = a.match(VERSION_RE)
  const pb = b.match(VERSION_RE)

  if (!pa || !pb) {
    throw new Error(`Cannot compare non-semver values: '${a}' and '${b}'`)
  }

  for (let i = 1; i <= 3; i++) {
    const diff = Number(pa[i]) - Number(pb[i])

    if (diff !== 0) {
      return diff
    }
  }

  return 0
}

const getLatestPublishedVersion = async () => {
  const res = await fetch(NPM_LATEST_URL)

  if (!res.ok) {
    throw new Error(`Failed to fetch latest cypress version: ${res.status} ${res.statusText}`)
  }

  const { version } = await res.json()

  return version
}

const readCurrentVersion = (env) => {
  const match = env.match(/^CYPRESS_VERSION=['"]?([^'"\n]+)['"]?/m)

  if (!match) {
    throw new Error(`Could not find CYPRESS_VERSION in ${ENV_PATH}`)
  }

  return match[1]
}

const emitOutput = async (values) => {
  const out = process.env.GITHUB_OUTPUT

  if (!out) {
    return
  }

  const lines = Object.entries(values).map(([key, value]) => `${key}=${value}`)

  await appendFile(out, `${lines.join('\n')}\n`)
}

const main = async () => {
  const { checkOnly, forced } = parseArgs(process.argv)

  const env = await readFile(ENV_PATH, 'utf8')
  const current = readCurrentVersion(env)
  const latest = forced ?? (await getLatestPublishedVersion())

  if (!VERSION_RE.test(latest)) {
    throw new Error(`Refusing to use non-stable version '${latest}' (expected MAJOR.MINOR.PATCH)`)
  }

  if (compareVersions(latest, current) <= 0) {
    console.log(`cypress/included is up to date (current: ${current}, latest: ${latest}).`)
    await emitOutput({ updated: 'false', version: current, previous: current })

    return
  }

  console.log(`New cypress version available: ${current} -> ${latest}`)

  if (checkOnly) {
    await emitOutput({ updated: 'true', version: latest, previous: current })

    return
  }

  const next = env.replace(
    /^(CYPRESS_VERSION=)['"]?[^'"\n]+['"]?/m,
    (_, prefix) => `${prefix}'${latest}'`,
  )

  await writeFile(ENV_PATH, next)
  console.log(`Updated CYPRESS_VERSION in factory/.env to ${latest}.`)
  await emitOutput({ updated: 'true', version: latest, previous: current })
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
