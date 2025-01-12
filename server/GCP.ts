import { env } from 'node:process'

export function isRunningOnGCP() {
  return Boolean(env.K_SERVICE)
}

export function getGCPProjectId() {
  const projectId = env.GCLOUD_PROJECT
  if (!projectId)
    throw new Error('GCLOUD_PROJECT is not set')

  return projectId
}
