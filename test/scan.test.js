const {
  TEST_PATTERN,
  TEST_MATCHING_DIR,
  TEST_NOT_MATCHING_DIR,
  TEST_EXCLUDE_DIRS,
  TEST_SCAN_EXTENSIONS
} = require('../test/constants')
const { getFilesMatchingPattern, findOccurrences } = require('../src/scan')

jest.mock('@actions/github', () => ({
  context: {
    repo: {
      owner: 'owner',
      repo: 'repository'
    }
  }
}))

beforeEach(() => {
  jest.resetModules()
})

describe('getFilesMatchingPattern', () => {
  it('should return the list of files matching with the specified pattern', () => {
    const filesList = getFilesMatchingPattern(
      TEST_PATTERN,
      TEST_MATCHING_DIR,
      TEST_EXCLUDE_DIRS,
      TEST_SCAN_EXTENSIONS
    )
    const expectedFilesList = [
      `${TEST_MATCHING_DIR}/sample1.js`,
      `${TEST_MATCHING_DIR}/sampleFile.ts`,
      `${TEST_MATCHING_DIR}/sample2.js`
    ]

    expect(filesList.sort()).toEqual(expectedFilesList.sort())
  })

  it('should return an empty array if no files are found with the specified pattern', () => {
    const filesList = getFilesMatchingPattern(
      TEST_PATTERN,
      TEST_NOT_MATCHING_DIR,
      TEST_EXCLUDE_DIRS,
      TEST_SCAN_EXTENSIONS
    )
    expect(filesList).toStrictEqual([])
  })
})

describe('findOccurrences', () => {
  it('should return the list of occurrences with the line number and the comment', () => {
    const result = findOccurrences(
      `${TEST_MATCHING_DIR}/sample1.js`,
      TEST_PATTERN
    )

    expect(result).toHaveProperty('file')
    expect(result).toHaveProperty('occurrences')
    expect(result.file).toBe(`${TEST_MATCHING_DIR}/sample1.js`)
    expect(result.occurrences).toHaveLength(2)
    result.occurrences.forEach(occurrence => {
      expect(occurrence).toHaveProperty('line')
      expect(occurrence).toHaveProperty('comment')
    })
  })
})
