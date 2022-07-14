'use strict'

const { execSync } = require('child_process')
const appRoot = require('app-root-path')

const { logError } = require('./log')
const { buildUrl } = require('./utils')

function getFilesMatchingPattern(pattern, scanDir) {
  try {
    const filesMatchingPattern = execSync(
      `grep -rl --exclude-dir=node_modules "${pattern}" ${appRoot}/${scanDir}`,
      {
        encoding: 'utf8'
      }
    )
      .split('\n')
      .filter(file => file)

    return filesMatchingPattern
  } catch (err) {
    logError(err)
    throw new Error('Pattern not found in the source code')
  }
}

function findOccurrencies(file, pattern) {
  try {
    const occurrencies = execSync(`grep -n ${pattern} ${file}`, {
      encoding: 'utf8'
    })
      .split('\n')
      .filter(line => line)
      .map(occurrence => buildOccurrence(occurrence, file))

    return { file, occurrencies }
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
  findOccurrencies
}
