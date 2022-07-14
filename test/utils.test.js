const {
  TEST_PATTERN,
  TEST_DEFAULT_SCAN_DIR,
  TEST_EXCLUDE_DIRS,
  TEST_SCAN_EXTENSIONS,
  TEST_MATCHING_DIR
} = require('../src/constants')
const { buildFileMatchingPatternCommand, buildUrl } = require('../src/utils')

jest.mock('@actions/github', () => ({
  context: {
    repo: {
      owner: 'owner',
      repo: 'repository'
    }
  }
}))

jest.mock('../src/inputs', () => ({
  getInputs: () => ({
    branch: 'main'
  })
}))

beforeEach(() => {
  jest.resetModules()
})

describe('buildFileMatchingPatternCommand', () => {
  it('should return the proper command with multiple excluded dirs and scan extensions', () => {
    const cmd = buildFileMatchingPatternCommand(
      TEST_PATTERN,
      TEST_DEFAULT_SCAN_DIR,
      TEST_EXCLUDE_DIRS,
      TEST_SCAN_EXTENSIONS
    )
    const expected =
      'find . -type f \\( -name "*.js" -o -name "*.ts" -o -name "*.cjs" -o -name "*.mjs" \\) ! -path "./node_modules/*" ! -path "./.github/*" -exec grep -rl "TODO" {} \\;'

    expect(cmd).toStrictEqual(expected)
  })

  it('should return the proper command with one excluded dirs and multiple scan extensions', () => {
    const cmd = buildFileMatchingPatternCommand(
      TEST_PATTERN,
      TEST_DEFAULT_SCAN_DIR,
      'node_modules',
      TEST_SCAN_EXTENSIONS
    )
    const expected =
      'find . -type f \\( -name "*.js" -o -name "*.ts" -o -name "*.cjs" -o -name "*.mjs" \\) ! -path "./node_modules/*" -exec grep -rl "TODO" {} \\;'

    expect(cmd).toStrictEqual(expected)
  })

  it('should return the proper command with multiple excluded dirs and one scan extension', () => {
    const cmd = buildFileMatchingPatternCommand(
      TEST_PATTERN,
      TEST_DEFAULT_SCAN_DIR,
      TEST_EXCLUDE_DIRS,
      '.js'
    )
    const expected =
      'find . -type f \\( -name "*.js" \\) ! -path "./node_modules/*" ! -path "./.github/*" -exec grep -rl "TODO" {} \\;'

    expect(cmd).toStrictEqual(expected)
  })

  it('should return the proper command with one excluded dirs and one scan extension', () => {
    const cmd = buildFileMatchingPatternCommand(
      TEST_PATTERN,
      TEST_DEFAULT_SCAN_DIR,
      'node_modules',
      '.js'
    )
    const expected =
      'find . -type f \\( -name "*.js" \\) ! -path "./node_modules/*" -exec grep -rl "TODO" {} \\;'

    expect(cmd).toStrictEqual(expected)
  })
})

describe('buildUrl', () => {
  it('should return the proper url with the filename and the line number as inputs', () => {
    const url = buildUrl(`${TEST_MATCHING_DIR}/index.js`, 15)
    const expected =
      'https://github.com/owner/repository/blob/main/test/resources/matchingDir/index.js?plain=1#L15'

    expect(url).toStrictEqual(expected)
  })
})
