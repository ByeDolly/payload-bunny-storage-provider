import type { StaticHandlerArgs } from './types'
import path from 'path'

export const staticHandler = (args: {
  cdnEndpoint: string
  prefix: string
}) => {
  return async ({ filename, res }: StaticHandlerArgs) => {
    const { cdnEndpoint, prefix } = args
    const filePath = path.posix.join(prefix, filename).replace(/^\/+/, '')
    const url = `${cdnEndpoint}/${filePath}`
    res.redirect(301, url)
  }
} 