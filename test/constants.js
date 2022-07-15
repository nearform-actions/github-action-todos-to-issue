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
const TEST_GITHUB_FAKE_VALUES = {
  repo: {
    owner: 'owner',
    repo: 'repository'
  },
  ref: 'refs/heads/main'
}
const TEST_TOKEN = 'token'
const TEST_ISSUE_BODY = 'sample issue body'
const TEST_ISSUE_NUMBER = 5
const TEST_GITHUB_CONTEXT = 'context'
const TEST_GITHUB_GET_OCTOKIT = 'getOctokit'

module.exports = {
  TEST_PATTERN,
  TEST_DEFAULT_SCAN_DIR,
  TEST_EXCLUDE_DIRS,
  TEST_SCAN_EXTENSIONS,
  TEST_MATCHING_DIR,
  TEST_NOT_MATCHING_DIR,
  TEST_FILE,
  TEST_GITHUB_FAKE_VALUES,
  TEST_TOKEN,
  TEST_ISSUE_BODY,
  TEST_ISSUE_NUMBER,
  TEST_GITHUB_CONTEXT,
  TEST_GITHUB_GET_OCTOKIT
}
