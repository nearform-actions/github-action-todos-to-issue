'use strict'
const github = require('@actions/github')
const { getInputs } = require('./inputs')

function buildFileMatchingPatternCommand(
  pattern,
  scanDir,
  excludeDirs,
  scanExtensions
) {
  const scanExtensionsCmd = scanExtensions
    .split(',')
    .filter(ext => ext)
    .map(ext => `-name "*${ext}"`)
    .join(' -o ')

  const excludeDirsCmd = excludeDirs
    .split(',')
    .filter(dir => dir)
    .map(dir => `! -path "./${dir}/*"`)
    .join(' ')

  return `find ${scanDir} -type f \\( ${scanExtensionsCmd} \\) ${excludeDirsCmd} -exec grep -rl "${pattern}" {} \\;`
}

function buildUrl(file, line) {
  const { branch } = getInputs()
  const { owner, repo } = github.context.repo

  const uri = `https://github.com/${owner}/${repo}/blob/${branch}/${file}?plain=1#L${line}`

  return uri
}

module.exports = {
  buildFileMatchingPatternCommand,
  buildUrl
}
