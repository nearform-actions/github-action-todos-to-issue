const { initInputs } = require('../src/inputs')

jest.mock('@actions/core', () => ({
  getInput: inputType => inputType
}))

describe('initInputs', () => {
  it('should initialise properly the GitHub action inputs', () => {
    const inputs = initInputs()
    const expectedInputs = {
      token: 'github-token',
      branch: 'github-branch',
      pattern: 'pattern',
      scanDir: 'scan-dir',
      excludeDirs: 'exclude-dirs',
      scanExtensions: 'scan-extensions'
    }
    expect(inputs).toStrictEqual(expectedInputs)
  })
})
