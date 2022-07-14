'use strict'

// import * as github from '@actions/github'

const { logInfo } = require('./log')
const { getFilesMatchingPattern, findOccurrencies } = require('./scan')
const { publishIssue, buildIssueBody } = require('./issue')
const { initInputs } = require('./inputs')

async function run() {
  // Initialise the GitHub action inputs
  const { token, pattern, workspace, scanDir } = initInputs()

  // Scan the repository
  const filesList = getFilesMatchingPattern(pattern, workspace, scanDir)
  if (filesList.length === 0) {
    logInfo(
      `Pattern "${pattern}" not found in the source code. Nothing else to do.`
    )
    return
  }

  // Loop each file and find the pattern occurrencies
  const occurrencies = filesList.map(file => findOccurrencies(file, pattern))
  console.log('Occurrencies print: ' + JSON.stringify(occurrencies))

  const issueBody = buildIssueBody(occurrencies)

  const issue = await publishIssue(token, issueBody)
  console.log('Issue number: ' + issue.number)
}

module.exports = {
  run
}
