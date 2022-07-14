'use strict'

const { execSync } = require('child_process')

const { logError } = require('./log')
const { buildUrl } = require('./utils')

function getFilesMatchingPattern(pattern, workspace, scanDir) {
  try {
    console.log('WORKSPACE: ' + workspace)

    console.log(execSync('ls -al', { encoding: 'utf8' }))

    let bashCommand = `grep -rl --exclude-dir={node_modules,.github} "${pattern}" ${workspace}/${scanDir}`
    const filesMatchingPattern = execSync(bashCommand, {
      encoding: 'utf8'
    })
      .split('\n')
      .filter(file => file)

    console.log(`COMMAND: ${bashCommand}`)
    console.log(
      'FILES MATCHING PATTERN: ' + JSON.stringify(filesMatchingPattern)
    )

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
