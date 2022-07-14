'use strict'
const core = require('@actions/core')

const inputs = {
  token: null,
  branch: null,
  pattern: null,
  scanDir: null,
  excludeDirs: null,
  scanExtensions: null
}

function initInputs() {
  inputs.token = core.getInput('github-token', { required: true })
  inputs.branch = core.getInput('github-branch', { required: true })
  inputs.pattern = core.getInput('pattern', { required: false })
  inputs.scanDir = core.getInput('scan-dir', { required: false })
  inputs.excludeDirs = core.getInput('exclude-dirs', { required: false })
  inputs.scanExtensions = core.getInput('scan-extensions', { required: false })
  return inputs
}

function getInputs() {
  return inputs
}

module.exports = {
  initInputs,
  getInputs
}
