const child_process = jest.genMockFromModule("child_process")

const mockOutput = {
  message: "",
}

const exec = jest.fn().mockImplementation((command, resolve) => {
  console.log(command)
  console.log(resolve)
  resolve(mockOutput[command])
})

child_process.exec = exec

module.exports = child_process
