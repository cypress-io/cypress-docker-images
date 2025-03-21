const { defineConfig } = require('cypress')

module.exports = defineConfig({
  downloadsFolder: '/tmp/cypress/downloads',
  screenshotsFolder: '/tmp/cypress/screenshots',
  videosFolder: '/tmp/cypress/videos',
  fixturesFolder: false,
  e2e: {
    supportFile: false,
  },
})
