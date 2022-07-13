const core = require('@actions/core')

const { run } = require('./action')

run().catch(error => core.setFailed(error))
