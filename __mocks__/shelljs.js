const shelljs = jest.genMockFromModule("shelljs")

shelljs.mkdir = jest.fn((folder) => {
  return folder
})

module.exports = shelljs
