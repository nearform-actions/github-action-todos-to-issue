'use strict'
const core = require('@actions/core')

const { logInfo } = require('./log')
const { getFilesMatchingPattern, findOccurrences } = require('./scan')
const { publishIssue, renderIssueBody } = require('./issue')

async function run() {
  // Initialise the GitHub action inputs
  const token = core.getInput('github-token', { required: true })
  const pattern = core.getInput('pattern', { required: false })
  const scanDir = core.getInput('scan-dir', { required: false })

  // Scan the repository
  const filesList = getFilesMatchingPattern(pattern, scanDir)
  if (filesList.length === 0) {
    logInfo(
      `Pattern "${pattern}" not found in the source code. Nothing else to do.`
    )
    return
  }

  // Loop each file and find the pattern occurrences
  const filesOccurrences = filesList.map(file => findOccurrences(file, pattern))

  // Render the issue body
  const issueBody = await renderIssueBody({ filesOccurrences })

  // Publish the issue
  const issue = await publishIssue(token, issueBody)
  logInfo(`Issue published successfully: #${issue.number}`)
}

module.exports = {
  run
}
