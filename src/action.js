'use strict'

// import * as github from '@actions/github'

const { logInfo } = require('./log')
const { getFilesMatchingPattern, findOccurrencies } = require('./scan')
const { publishIssue, renderIssueBody } = require('./issue')
const { initInputs } = require('./inputs')

async function run() {
  // Initialise the GitHub action inputs
  const { token, pattern, scanDir, excludeDirs, scanExtensions } = initInputs()

  // Scan the repository
  const filesList = getFilesMatchingPattern(
    pattern,
    scanDir,
    excludeDirs,
    scanExtensions
  )
  if (filesList.length === 0) {
    logInfo(
      `Pattern "${pattern}" not found in the source code. Nothing else to do.`
    )
    return
  }

  // Loop each file and find the pattern occurrencies
  const filesOccurrencies = filesList.map(file =>
    findOccurrencies(file, pattern)
  )

  // Render the issue body
  const issueBody = await renderIssueBody({ filesOccurrencies })

  // Publish the issue
  const issue = await publishIssue(token, issueBody)
  logInfo(`Issue publish successfully: #${issue.number}`)
}

module.exports = {
  run
}
