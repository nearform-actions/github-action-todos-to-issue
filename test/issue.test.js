import { test } from 'tap'
import esmock from 'esmock'
import { readFile } from 'node:fs/promises'

import {
  TEST_GITHUB_FAKE_VALUES,
  TEST_TOKEN,
  TEST_ISSUE_BODY,
  TEST_ISSUE_NUMBER
} from './constants.js'
import { renderIssueBody } from '../src/issue.js'

test('publishIssue', t => {
  t.test('should create an issue if not already present', async t => {
    const issueModule = await esmock('../src/issue.js', {
      '@actions/github': {
        context: TEST_GITHUB_FAKE_VALUES,
        getOctokit: () => ({
          request: async () => ({ data: [] }),
          rest: {
            issues: {
              create: async () => ({
                data: { number: TEST_ISSUE_NUMBER, body: TEST_ISSUE_BODY }
              })
            }
          }
        })
      }
    })

    const issue = await issueModule.publishIssue(TEST_TOKEN, TEST_ISSUE_BODY)
    t.equal(issue.number, TEST_ISSUE_NUMBER)
    t.equal(issue.body, TEST_ISSUE_BODY)

    t.end()
  })

  t.test('should update the issue if already present', async t => {
    const issueModule = await esmock('../src/issue.js', {
      '@actions/github': {
        context: TEST_GITHUB_FAKE_VALUES,
        getOctokit: () => ({
          request: async () => ({ data: [{ number: TEST_ISSUE_NUMBER }] }),
          rest: {
            issues: {
              update: async () => ({
                data: { number: TEST_ISSUE_NUMBER, body: TEST_ISSUE_BODY }
              })
            }
          }
        })
      }
    })

    const issue = await issueModule.publishIssue(TEST_TOKEN, TEST_ISSUE_BODY)
    t.equal(issue.number, TEST_ISSUE_NUMBER)
    t.equal(issue.body, TEST_ISSUE_BODY)

    t.end()
  })

  t.end()
})

test('renderIssueBody', t => {
  t.test(
    'should return the proper rendendered issue body with markdown format',
    async t => {
      const data = {
        filesOccurrences: [
          {
            file: 'filename.js',
            occurrences: [
              {
                line: 2,
                comment: 'test comment',
                url: 'https://url.com'
              },
              {
                line: 15,
                comment: 'test comment 2',
                url: 'https://url2.com'
              }
            ]
          },
          {
            file: 'filename2.js',
            occurrences: [
              {
                line: 567,
                comment: 'test comment 3',
                url: 'https://url3.com'
              }
            ]
          }
        ]
      }

      const body = await renderIssueBody(data)

      const snapshotUrl = new URL(
        './resources/issue.snapshot.md',
        import.meta.url
      )
      const snapshotStringBuffer = await readFile(snapshotUrl)

      t.equal(body, snapshotStringBuffer.toString())

      t.end()
    }
  )

  t.end()
})
