'use strict'

const { execSync } = require('child_process')

const { logError } = require('./log')
const {
  buildFileMatchingPatternCommand,
  buildOccurrencesCommand,
  buildUrl
} = require('./utils')

/**
 * It returns the list of files matching the specified pattern in the specified directory
 * @param {string} pattern comma separated pattern
 * @param {string} scanDir the directory to scan
 * @returns the list of files matching the specified pattern
 */
function getFilesMatchingPattern(pattern, scanDir) {
  const bashCommand = buildFileMatchingPatternCommand(pattern, scanDir)
  const filesMatchingPattern = execSync(bashCommand, {
    encoding: 'utf8'
  })
    .split('\n')
    .filter(file => file)

  return filesMatchingPattern
}

/**
 * It returns the occurrences for the specified pattern in the file
 * @param {string} file location
 * @param {string} pattern comma separated pattern
 * @returns the occurrences for the specified pattern in the file
 */
function findOccurrences(file, pattern) {
  try {
    const occurrencesCommand = buildOccurrencesCommand(pattern, file)
    const occurrences = execSync(occurrencesCommand, {
      encoding: 'utf8'
    })
      .split('\n')
      .filter(line => line)
      .map(occurrence => buildOccurrence(occurrence, file))

    return { file, occurrences }
  } catch (err) {
    logError(err)
    throw new Error(err.message)
  }
}

function buildOccurrence(occurrence, file) {
  const occurrenceParts = occurrence.split(/:(.*)/s)

  if (occurrenceParts.length < 2) {
    throw new Error('Unable to parse the current line: ' + occurrence)
  }

  const line = parseInt(occurrenceParts[0])
  const comment = occurrenceParts[1].trim()
  const url = buildUrl(file, line)

  const parsedOccurrence = {
    line,
    comment,
    url
  }

  return parsedOccurrence
}

module.exports = {
  getFilesMatchingPattern,
  findOccurrences
}
