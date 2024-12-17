import type { HandleDeleteArgs } from './types'
import path from 'path'
import fetch from 'node-fetch'

export const handleDelete = (args: {
  storageEndpoint: string
  apiKey: string
  prefix: string
}) => {
  return async ({ filename }: HandleDeleteArgs) => {
    const { storageEndpoint, apiKey, prefix } = args
    const filePath = path.posix.join(prefix, filename).replace(/^\/+/, '')

    const response = await fetch(`${storageEndpoint}/${filePath}`, {
      method: 'DELETE',
      headers: {
        'AccessKey': apiKey,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to delete from Bunny: ${response.statusText}`)
    }
  }
} 