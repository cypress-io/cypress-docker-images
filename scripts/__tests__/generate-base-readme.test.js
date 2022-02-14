import path from "path"
import { exec } from "child_process"

jest.mock("fs")
jest.mock("shelljs")

describe("base readme generator", () => {
  it("fails if not passed a semantic version", async () => {
    const baseReadmeGenerator = path.join(__dirname, "../generate-base-readme.js")

    await exec(`node ${baseReadmeGenerator} -- 16.3.0-test`, (error) => {
      expect(error.message).toContain("expected version tag argument like")
      expect(error.code).toBe(1)
    })
  })
})
