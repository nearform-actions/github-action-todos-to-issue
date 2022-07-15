import { test } from 'tap'
import sinon from 'sinon'
import * as github from '@actions/github'

import { publishIssue } from '../src/issue.js'
import {
  TEST_GITHUB_FAKE_VALUES,
  TEST_TOKEN,
  TEST_ISSUE_BODY,
  TEST_ISSUE_NUMBER,
  TEST_GITHUB_CONTEXT,
  TEST_GITHUB_GET_OCTOKIT
} from './constants.js'

test('publishIssue', t => {
  t.beforeEach(() => {
    sinon.stub(github, TEST_GITHUB_CONTEXT).value(TEST_GITHUB_FAKE_VALUES)
  })
  t.afterEach(() => {
    sinon.restore()
  })

  t.plan(2)

  t.test('should create an issue if not already present', async t => {
    t.plan(2)

    sinon.stub(github, TEST_GITHUB_GET_OCTOKIT).returns({
      request: async () => ({ data: [] }),
      rest: {
        issues: {
          create: async () => ({
            data: { number: TEST_ISSUE_NUMBER, body: TEST_ISSUE_BODY }
          })
        }
      }
    })

    const issue = await publishIssue(TEST_TOKEN, TEST_ISSUE_BODY)
    t.equal(issue.number, TEST_ISSUE_NUMBER)
    t.equal(issue.body, TEST_ISSUE_BODY)
  })

  t.test('should update the issue if already present', async t => {
    t.plan(2)

    sinon.stub(github, TEST_GITHUB_GET_OCTOKIT).returns({
      request: async () => ({ data: [{ number: TEST_ISSUE_NUMBER }] }),
      rest: {
        issues: {
          update: async () => ({
            data: { number: TEST_ISSUE_NUMBER, body: TEST_ISSUE_BODY }
          })
        }
      }
    })

    const issue = await publishIssue(TEST_TOKEN, TEST_ISSUE_BODY)
    t.equal(issue.number, TEST_ISSUE_NUMBER)
    t.equal(issue.body, TEST_ISSUE_BODY)
  })
})
