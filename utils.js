const semver = require("semver")

const isStrictSemver = (s) => {
  const parsed = semver.valid(s)
  if (!parsed) {
    return false
  }
  const cleaned = semver.clean(s)
  return cleaned === s
}

const isAValidImageScope = (s) => {
  return s === "base" || s === "browsers" || s === "included"
}

module.exports = { isStrictSemver, isAValidImageScope }
