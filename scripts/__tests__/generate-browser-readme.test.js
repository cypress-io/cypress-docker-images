const fs = require("fs")
const path = require("path")
const { exec } = require("child_process")

describe("browser readme generator", () => {
  it("fails if not passed a base browser image version like 'cypress/browsers:node12.6.0-chrome77'", async () => {
    const browserReadmeGenerator = path.join(__dirname, "../generate-browser-readme.js")

    await exec(`node ${browserReadmeGenerator}`, (error) => {
      expect(error.message).toContain("expected base Docker image tag like")
      expect(error.code).toBe(1)
    })
  })

  it("fails if not passed a base browser image version like 'cypress/browsers:*'", async () => {
    const browserReadmeGenerator = path.join(__dirname, "../generate-browser-readme.js")

    await exec(`node ${browserReadmeGenerator} node12.6.0-chrome77 --chrome=77`, (error) => {
      expect(error.message).toContain('expected the base Docker image tag to be one of "cypress/browsers:*"')
      expect(error.code).toBe(1)
    })
  })

  it("fails if not passed one of: chrome, firefox, or edge", async () => {
    const browserReadmeGenerator = path.join(__dirname, "../generate-browser-readme.js")

    await exec(`node ${browserReadmeGenerator} cypress/browsers:node12.6.0-chrome77`, (error) => {
      expect(error.message).toContain("expected at least one browser version like")
      expect(error.code).toBe(1)
    })
  })
})
