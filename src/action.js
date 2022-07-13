// import * as github from '@actions/github'
const core = require('@actions/core')

const { getFilesMatchingPattern, findOccurrencies } = require('./scan')

async function run() {
  //const token = core.getInput('github-token', { required: true })
  const pattern = core.getInput('pattern', { required: false })
  const scanDir = core.getInput('scan-dir', { required: false })

  // Scan the repository
  const filesList = getFilesMatchingPattern(pattern, scanDir)

  // Loop each file and find the pattern occurrencies
  const occurrencies = filesList.map(file => findOccurrencies(file, pattern))
  console.log(occurrencies)
}

module.exports = {
  run
}
