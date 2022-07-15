import { test } from 'tap'
import sinon from 'sinon'
import * as github from '@actions/github'

import {
  buildFileMatchingPatternCommand,
  buildOccurrencesCommand,
  buildUrl
} from '../src/utils.js'
import {
  TEST_PATTERN,
  TEST_MATCHING_DIR,
  TEST_FILE,
  TEST_GITHUB_FAKE_VALUES,
  TEST_GITHUB_CONTEXT
} from './constants.js'

test('buildFileMatchingPatternCommand', t => {
  t.plan(1)

  t.test('should return the proper command', t => {
    t.plan(1)

    const cmd = buildFileMatchingPatternCommand(TEST_PATTERN, TEST_MATCHING_DIR)
    const expected =
      'find test/resources/matchingDir -type f -exec grep -rl -e "TODO:" -e "// TODO" {} \\;'

    t.equal(cmd, expected)
  })
})

test('buildOccurrencesCommand', t => {
  t.plan(1)

  t.test('should return the proper command', t => {
    t.plan(1)

    const cmd = buildOccurrencesCommand(TEST_PATTERN, TEST_FILE)
    const expected =
      'grep -n -e "TODO:" -e "// TODO" test/resources/matchingDir/sample1.js'
    t.equal(cmd, expected)
  })
})

test('buildUrl', t => {
  t.afterEach(() => {
    sinon.restore()
  })

  t.plan(1)

  t.test('should return the proper url', t => {
    t.plan(1)

    sinon.stub(github, TEST_GITHUB_CONTEXT).value(TEST_GITHUB_FAKE_VALUES)

    const url = buildUrl(TEST_FILE, 5)
    const expected =
      'https://github.com/owner/repository/blob/main/test/resources/matchingDir/sample1.js?plain=1#L5'
    t.equal(url, expected)
  })
})
