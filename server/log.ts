import type { LogEntry, LogSeverity } from 'firebase-functions/logger'
import { Logging } from '@google-cloud/logging'

import { getGCPProjectId, isRunningOnGCP } from './GCP'

let logging: Logging | null = null
/**
 * A logging function that is compatible with GCP Logging.
 *
 * @param severity - The severity of the log entry, see {@link LogSeverity} for more information.
 * @param payload - The payload to log, either a string or an object with a message property and any other properties.
 */
export function log(severity: LogSeverity, payload: string | { message: string, [key: string]: unknown }) {
  if (isRunningOnGCP()) {
    const message = typeof payload === 'string' ? payload : JSON.stringify(payload, null, 2)
    // eslint-disable-next-line no-console
    console.log(`[${severity}]`, message)
    return
  }

  logging ??= new Logging()

  const event = useEvent()
  const headers = getHeaders(event)
  const traceparent = headers.traceparent
  const projectId = getGCPProjectId()

  const resource = {
    severity,
  } as LogEntry

  if (projectId && traceparent) {
    const [traceVersion, traceId, parentId, _traceFlags] = traceparent.split('-')
    if (traceVersion === '00') {
      resource.trace = `projects/${projectId}/traces/${traceId}`
      resource.spanId = parentId
    }
  }

  const entry = logging.entry(resource, payload).toStructuredJSON()
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(entry))
}
