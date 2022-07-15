'use strict'
const github = require('@actions/github')

/**
 * It builds the file matching pattern command combining the `find` and `grep` commands
 * @param {string} pattern comma separated pattern
 * @param {string} scanDir scan directory
 * @returns the file matching pattern command
 */
function buildFileMatchingPatternCommand(pattern, scanDir) {
  const patternCmd = buildPatternCommand(pattern)

  return `find ${scanDir} -type f -exec grep -rl ${patternCmd} {} \\;`
}

/**
 * It builds the find occurrences command using the `grep` command
 * @param {string} pattern comma separated pattern
 * @param {string} file location
 * @returns the find occurrences command
 */
function buildOccurrencesCommand(pattern, file) {
  const patternCmd = buildPatternCommand(pattern)

  return `grep -n ${patternCmd} ${file}`
}

/**
 * It builds the url for navigating to the line number of a specific file in the repository
 * @param {string} file filaname
 * @param {number} line number
 * @returns the url for navigating to the line number
 */
function buildUrl(file, line) {
  const { owner, repo } = github.context.repo
  const branch = getBranch(github.context.ref)
  const uri = `https://github.com/${owner}/${repo}/blob/${branch}/${file}?plain=1#L${line}`

  return uri
}

function buildPatternCommand(pattern) {
  return pattern
    .split(',')
    .filter(ptrn => ptrn)
    .map(ptrn => `-e "${ptrn}"`)
    .join(' ')
}

function getBranch(ref) {
  return ref.replace('refs/heads/', '')
}

module.exports = {
  buildFileMatchingPatternCommand,
  buildOccurrencesCommand,
  buildUrl
}
