const LOG_TYPES = {
  LOG: 'log',
  ERROR: 'error',
  WARN: 'warn',
}

/* eslint-disable no-console */

// This helper function should be refactored into a Sentry kind of logging service collect and reporting purposes
const LogHelper = ({ logType, message }: { logType: string; message: string }): boolean => {
  if (!Object.values(LOG_TYPES).some((type) => type === logType)) return false
  switch (logType) {
    case LOG_TYPES.LOG:
      console.log(message)
      break
    case LOG_TYPES.ERROR:
      console.error(message)
      break
    case LOG_TYPES.WARN:
      console.warn(message)
      break

    default:
      break
  }
  return true
}
/* eslint-enable no-console */

export default LogHelper
