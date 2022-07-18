/**
 * Tests
 */
export const TEST_PATTERN = 'TODO:,// TODO'
export const TEST_DEFAULT_SCAN_DIR = '.'
export const TEST_EXCLUDE_DIRS = 'node_modules,.github'
export const TEST_SCAN_EXTENSIONS = '.js,.ts,.cjs,.mjs'
export const TEST_MATCHING_DIR = 'test/resources/matchingDir'
export const TEST_NOT_MATCHING_DIR = 'test/resources/notMatchingDir'
export const TEST_FILE = TEST_MATCHING_DIR + '/sample1.js'
export const TEST_GITHUB_FAKE_VALUES = {
  repo: {
    owner: 'owner',
    repo: 'repository'
  },
  ref: 'refs/heads/main'
}
export const TEST_TOKEN = 'token'
export const TEST_ISSUE_BODY = 'sample issue body'
export const TEST_ISSUE_NUMBER = 5
export const TEST_GITHUB_CONTEXT = 'context'
export const TEST_GITHUB_GET_OCTOKIT = 'getOctokit'
