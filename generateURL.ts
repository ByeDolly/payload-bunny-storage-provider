import path from 'path'
import type { GenerateURLArgs } from './types'

export const generateURL = (args: {
  cdnEndpoint: string
  prefix: string
}) => {
  return ({ filename }: GenerateURLArgs): string => {
    const { cdnEndpoint, prefix } = args
    const filePath = path.posix.join(prefix, filename).replace(/^\/+/, '')
    return `${cdnEndpoint}/${filePath}`
  }
} 