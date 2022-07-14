'use strict'
const github = require('@actions/github')
const { getInputs } = require('./inputs')

async function buildUrl(file, line) {
  const { workspace, branch } = getInputs()
  const { owner, repo } = github.context.repo

  console.log('buildUrl - owner: ' + owner)
  console.log('buildUrl - repo: ' + repo)

  const relativeFilePath = getRelativeFilePath(file, workspace)

  const uri = `https://github.com/${owner}/${repo}/blob/${branch}/${relativeFilePath}?plain=1#L${line}`

  return uri
}

function getRelativeFilePath(file, workspace) {
  return file.replace(workspace, '')
}

module.exports = {
  buildUrl
}
