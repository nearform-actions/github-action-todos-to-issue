import { test } from 'tap'
import esmock from 'esmock'

import {
  buildFileMatchingPatternCommand,
  buildOccurrencesCommand
} from '../src/utils.js'
import {
  TEST_PATTERN,
  TEST_MATCHING_DIR,
  TEST_FILE,
  TEST_GITHUB_FAKE_VALUES
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
  t.plan(1)

  t.test('should return the proper url', async t => {
    t.plan(1)

    const utilsModule = await esmock('../src/utils.js', {
      '@actions/github': {
        context: TEST_GITHUB_FAKE_VALUES
      }
    })

    const url = utilsModule.buildUrl(TEST_FILE, 5)
    const expected =
      'https://github.com/owner/repository/blob/main/test/resources/matchingDir/sample1.js?plain=1#L5'
    t.equal(url, expected)
  })
})
