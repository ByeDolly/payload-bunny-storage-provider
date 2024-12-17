import type { StorageRequestHandlerArgs } from '@payloadcms/plugin-cloud-storage/dist/types'

export interface BunnyStorageConfig {
  storageZoneName: string
  apiKey: string
  hostname?: string
  cdnDomain?: string
  directory?: string
}

export interface HandleUploadArgs extends StorageRequestHandlerArgs {
  filename?: string
}

export interface HandleDeleteArgs {
  filename: string
}

export interface GenerateURLArgs {
  filename: string
}

export interface StaticHandlerArgs {
  filename: string
  res: any
} 