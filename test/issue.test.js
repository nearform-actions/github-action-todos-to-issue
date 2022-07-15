const { getOctokit } = require('@actions/github')
const { publishIssue } = require('../src/issue')

const token = 'token'
const owner = 'owner'
const repo = 'repository'

jest.mock('../src/log', () => ({
  logInfo: jest.fn()
}))

jest.mock('@actions/github', () => ({
  getOctokit: jest.fn(),
  context: { repo: { owner, repo } }
}))

beforeEach(() => {
  jest.resetModules()
})

describe('publishIssue', () => {
  it('should create an issue if not already present', async () => {
    getOctokit.mockReturnValue({
      request: async () => ({ data: [] }),
      rest: { issues: { create: async () => ({ data: { number: 1 } }) } }
    })

    const issue = await publishIssue(token, 'sample body')

    expect(issue.number).toStrictEqual(1)
  })

  it('should update the issue if already present', async () => {
    const body = 'updated body'
    const issueNumber = 1
    getOctokit.mockReturnValue({
      request: async () => ({ data: [{ number: issueNumber }] }),
      rest: {
        issues: {
          update: async () => ({ data: { number: issueNumber, body } })
        }
      }
    })

    const issue = await publishIssue(token, body)

    expect(issue.number).toStrictEqual(issueNumber)
    expect(issue.body).toStrictEqual(body)
  })
})
