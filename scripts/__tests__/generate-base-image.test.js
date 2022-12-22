import path from "path"
import { exec } from "child_process"

jest.mock("fs")
jest.mock("shelljs")

describe("base image generator", () => {
  it("fails if not passed a semantic version", async () => {
    const baseImageGenerator = path.join(__dirname, "../generate-base-image.js")
    await exec(`node ${baseImageGenerator} -- 16.3.0-test`, (error) => {
      expect(error.message).toContain("expected version tag argument like")
      expect(error.code).toBe(1)
    })
  })
})
