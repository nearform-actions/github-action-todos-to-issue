/**
 * Issue
 */
const ISSUE_LABEL = 'todos'
const ISSUE_TITLE = 'Source code TODOs list'
const ISSUE_STATE_OPEN = 'open'
const ISSUE_STATE_CLOSED = 'closed'

/**
 * Tests
 */
const TEST_PATTERN = 'TODO'
const TEST_DEFAULT_SCAN_DIR = '.'
const TEST_EXCLUDE_DIRS = 'node_modules,.github'
const TEST_SCAN_EXTENSIONS = '.js,.ts,.cjs,.mjs'
const TEST_MATCHING_DIR = 'test/resources/matchingDir'
const TEST_NOT_MATCHING_DIR = 'test/resources/notMatchingDir'

module.exports = {
  ISSUE_LABEL,
  ISSUE_TITLE,
  ISSUE_STATE_OPEN,
  ISSUE_STATE_CLOSED,
  TEST_PATTERN,
  TEST_DEFAULT_SCAN_DIR,
  TEST_EXCLUDE_DIRS,
  TEST_SCAN_EXTENSIONS,
  TEST_MATCHING_DIR,
  TEST_NOT_MATCHING_DIR
}
