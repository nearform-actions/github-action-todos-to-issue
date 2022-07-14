'use strict'
const core = require('@actions/core')

const inputs = {
  token: null,
  currentBranch: null,
  pattern: null,
  scanDir: null
}

function initInputs() {
  inputs.token = core.getInput('github-token', { required: true })
  inputs.currentBranch = core.getInput('current-branch', { required: true })
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
