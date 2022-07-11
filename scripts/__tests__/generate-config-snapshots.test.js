import cp from 'child_process'
import path from 'path'
import fs from 'fs'

const rootDir = path.join(__dirname, '..', '..')
const circleYml = path.join(rootDir, 'circle.yml')

describe('generate config snapshots', () => {
  it('generates config for base', () => {
    cp.spawnSync('node', './scripts/generate-config base 16.14.2-slim'.split(' '), { cwd: rootDir })
    expect(fs.readFileSync(circleYml).toString()).toMatchSnapshot()
  })

  it('generates config for browsers', () => {
    cp.spawnSync('node', './scripts/generate-config browsers node16.14.2-slim-chrome103-ff99'.split(' '), { cwd: rootDir })
    expect(fs.readFileSync(circleYml).toString()).toMatchSnapshot()
  })

  it('generates config for included', () => {
    cp.spawnSync('node', './scripts/generate-config included 10.2.0'.split(' '), { cwd: rootDir })
    expect(fs.readFileSync(circleYml).toString()).toMatchSnapshot()
  })
})