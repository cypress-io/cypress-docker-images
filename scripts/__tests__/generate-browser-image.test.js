import path from "path"
import { exec } from "child_process"

jest.mock("fs")
jest.mock("shelljs")

describe("browser image generator", () => {
  afterAll((done) => {
    done()
  })

  it("fails if not passed a base node version", async () => {
    const browserImageGenerator = path.join(__dirname, "../generate-browser-image.js")

    await exec(`node ${browserImageGenerator} --chrome=85`, (error) => {
      expect(error.message).toContain("expected a base image version like")
      expect(error.code).toBe(1)
    })
  })

  it("fails if not passed one of: chrome, firefox, or edge", async () => {
    const browserImageGenerator = path.join(__dirname, "../generate-browser-image.js")

    await exec(`node ${browserImageGenerator} 16.13.0`, (error) => {
      expect(error.message).toContain("expected at least one browser version like")
      expect(error.code).toBe(1)
    })
  })
})
