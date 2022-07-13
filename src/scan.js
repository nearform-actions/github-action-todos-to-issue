const { execSync } = require('child_process')
const appRoot = require('app-root-path')

const { logError } = require('./log')

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
      .map(occurrence => buildOccurrenceObject(occurrence))

    return { file, occurrencies }
  } catch (err) {
    logError(err)
    throw new Error(err.message)
  }
}

function buildOccurrenceObject(occurrence) {
  const occurrenceParts = occurrence.split(/:(.*)/s)

  if (occurrenceParts.length < 2) {
    throw new Error('Unable to parse the current line: ' + occurrence)
  }

  const parsedOccurrence = {
    line: parseInt(occurrenceParts[0]),
    comment: occurrenceParts[1].trim()
  }

  return parsedOccurrence
}

module.exports = {
  getFilesMatchingPattern,
  findOccurrencies
}
