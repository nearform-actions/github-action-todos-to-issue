'use strict'

const { execSync } = require('child_process')

const { logError } = require('./log')
const {
  buildFileMatchingPatternCommand,
  buildOccurrencesCommand,
  buildUrl
} = require('./utils')

function getFilesMatchingPattern(pattern, scanDir) {
  const bashCommand = buildFileMatchingPatternCommand(pattern, scanDir)
  const filesMatchingPattern = execSync(bashCommand, {
    encoding: 'utf8'
  })
    .split('\n')
    .filter(file => file)

  return filesMatchingPattern
}

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
