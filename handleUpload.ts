import type { HandleUploadArgs } from './types'
import path from 'path'
import fetch from 'node-fetch'

export const handleUpload = (args: {
  storageEndpoint: string
  apiKey: string
  prefix: string
}) => {
  return async ({ file, filename }: HandleUploadArgs) => {
    const { storageEndpoint, apiKey, prefix } = args

    try {
      const finalFilename = filename || generateFilename(file)
      const filePath = path.posix.join(prefix, finalFilename).replace(/^\/+/, '')
      const fileSize = file?.filesize || file?.size || Buffer.byteLength(file?.buffer)
      const mimeType = file?.mimeType || file?.mimetype || 'image/png'

      const response = await fetch(`${storageEndpoint}/${filePath}`, {
        method: 'PUT',
        body: file.buffer,
        headers: {
          'AccessKey': apiKey,
          'Content-Type': mimeType,
          'Content-Length': fileSize.toString(),
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to upload to Bunny: ${response.statusText} (${response.status}) - ${errorText}`)
      }

      return {
        filename: filePath,
        filesize: fileSize,
      }
    } catch (error) {
      console.error('Bunny Upload Exception:', error)
      throw error
    }
  }
}

const generateFilename = (file: any): string => {
  if (file?.filename) {
    return file.filename
  }

  const ext = file?.mimeType ? `.${file.mimeType.split('/')[1]}` : '.png'
  const timestamp = Date.now()
  return `upload-${timestamp}${ext}`
} 