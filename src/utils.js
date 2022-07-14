'use strict'
const appRoot = require('app-root-path')
const github = require('@actions/github')
const { getInputs } = require('./inputs')

async function buildUrl(file, line) {
  const { currentBranch } = getInputs()
  const { owner, repo } = github.context.repo

  const relativeFilePath = getRelativeFilePath(file)

  const uri = `https://github.com/${owner}/${repo}/blob/${currentBranch}/${relativeFilePath}?plain=1#L${line}`

  return uri
}

function getRelativeFilePath(file) {
  return file.replace(appRoot, '')
}

module.exports = {
  buildUrl
}
