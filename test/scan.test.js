import { test } from 'tap'
import sinon from 'sinon'
import * as github from '@actions/github'

import { getFilesMatchingPattern, findOccurrences } from '../src/scan.js'
import {
  TEST_GITHUB_FAKE_VALUES,
  TEST_PATTERN,
  TEST_MATCHING_DIR,
  TEST_NOT_MATCHING_DIR,
  TEST_FILE,
  TEST_GITHUB_CONTEXT
} from './constants.js'

test('getFilesMatchingPattern', t => {
  t.plan(2)

  t.test(
    'should return the list of files matching with the specified pattern',
    t => {
      t.plan(1)

      const filesList = getFilesMatchingPattern(TEST_PATTERN, TEST_MATCHING_DIR)
      const expectedFilesList = [
        `${TEST_MATCHING_DIR}/sample1.js`,
        `${TEST_MATCHING_DIR}/sample2.js`,
        `${TEST_MATCHING_DIR}/sample3.ts`
      ]

      t.same(filesList.sort(), expectedFilesList.sort())
    }
  )

  t.test(
    'should return an empty array if no files are found with the specified pattern',
    t => {
      t.plan(1)

      const filesList = getFilesMatchingPattern(
        TEST_PATTERN,
        TEST_NOT_MATCHING_DIR
      )

      t.same(filesList, [])
    }
  )
})

test('findOccurrences', t => {
  t.beforeEach(() => {
    sinon.stub(github, TEST_GITHUB_CONTEXT).value(TEST_GITHUB_FAKE_VALUES)
  })
  t.afterEach(() => {
    sinon.restore()
  })

  t.plan(1)

  t.test(
    'should return the list of occurrences with the line number and the comment',
    t => {
      t.plan(5)

      const result = findOccurrences(TEST_FILE, TEST_PATTERN)
      t.hasProps(result, ['file', 'occurrences'])
      t.equal(result.file, TEST_FILE)
      t.equal(result.occurrences.length, 2)
      result.occurrences.forEach(occurrence => {
        t.hasProps(occurrence, ['line', 'comment', 'url'])
      })
    }
  )
})
