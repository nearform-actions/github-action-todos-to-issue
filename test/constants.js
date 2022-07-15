/**
 * Tests
 */
const TEST_PATTERN = 'TODO:,// TODO'
const TEST_DEFAULT_SCAN_DIR = '.'
const TEST_EXCLUDE_DIRS = 'node_modules,.github'
const TEST_SCAN_EXTENSIONS = '.js,.ts,.cjs,.mjs'
const TEST_MATCHING_DIR = 'test/resources/matchingDir'
const TEST_NOT_MATCHING_DIR = 'test/resources/notMatchingDir'
const TEST_FILE = TEST_MATCHING_DIR + '/sample1.js'

module.exports = {
  TEST_PATTERN,
  TEST_DEFAULT_SCAN_DIR,
  TEST_EXCLUDE_DIRS,
  TEST_SCAN_EXTENSIONS,
  TEST_MATCHING_DIR,
  TEST_NOT_MATCHING_DIR,
  TEST_FILE
}
