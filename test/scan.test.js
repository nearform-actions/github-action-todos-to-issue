const appRoot = require('app-root-path')

const { TEST_MATCHING_DIR, TEST_NOT_MATCHING_DIR } = require('../src/constants')
const { getFilesMatchingPattern, findOccurrencies } = require('../src/scan')

const pattern = 'TODO'

describe('getFilesMatchingPattern', () => {
  it('should return the list of files matching with the specified pattern', () => {
    const filesList = getFilesMatchingPattern(pattern, TEST_MATCHING_DIR)
    const expectedFilesList = [
      `${appRoot}/${TEST_MATCHING_DIR}/sample1.js`,
      `${appRoot}/${TEST_MATCHING_DIR}/sample2.js`
    ]
    expect(filesList).toEqual(expect.arrayContaining(expectedFilesList))
  })

  it('should throw an error if no files are found with the specified pattern', () => {
    expect.assertions(1)
    try {
      getFilesMatchingPattern(pattern, TEST_NOT_MATCHING_DIR)
    } catch (err) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(err.message).toBe('Pattern not found in the source code')
    }
  })
})

describe('findOccurrencies', () => {
  it('should return the list of occurrencies with the line number and the comment', () => {
    const result = findOccurrencies(
      `${appRoot}/${TEST_MATCHING_DIR}/sample1.js`,
      pattern
    )

    expect(result).toHaveProperty('file')
    expect(result).toHaveProperty('occurrencies')
    expect(result.file).toBe(`${appRoot}/${TEST_MATCHING_DIR}/sample1.js`)
    expect(result.occurrencies).toHaveLength(2)
    result.occurrencies.forEach(occurrence => {
      expect(occurrence).toHaveProperty('line')
      expect(occurrence).toHaveProperty('comment')
    })
  })
})
