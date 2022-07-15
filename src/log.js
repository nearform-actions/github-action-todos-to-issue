import { debug, error, info, warning } from '@actions/core'

const log = logger => message => logger(JSON.stringify(message))

export const logDebug = () => log(debug)
export const logInfo = () => log(info)
export const logWarning = () => log(warning)
export const logError = () => log(error)
