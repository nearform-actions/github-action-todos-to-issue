'use strict'
const core = require('@actions/core')

const inputs = {
  token: null,
  workspace: null,
  branch: null,
  pattern: null,
  scanDir: null
}

function initInputs() {
  inputs.token = core.getInput('github-token', { required: true })
  inputs.workspace = core.getInput('github-workspace', { required: true })
  inputs.branch = core.getInput('github-branch', { required: true })
  inputs.pattern = core.getInput('pattern', { required: false })
  inputs.scanDir = core.getInput('scan-dir', { required: false })
  return inputs
}

function getInputs() {
  return inputs
}

module.exports = {
  initInputs,
  getInputs
}
