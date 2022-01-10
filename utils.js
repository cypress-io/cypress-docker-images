const semver = require("semver")

const isStrictSemver = (s) => {
  const parsed = semver.valid(s)
  if (!parsed) {
    return false
  }
  const cleaned = semver.clean(s)
  return cleaned === s
}

module.exports = { isStrictSemver }
