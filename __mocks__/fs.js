const fs = jest.genMockFromModule("fs")

const mockOutput = {
  message: "",
}

const writeFileSync = jest.fn().mockImplementation((filename, contents, encoding) => {
  return contents.trim()
})

fs.writeFileSync = writeFileSync

module.exports = fs
