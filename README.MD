# Payload CMS Bunny Storage Adapter

A storage adapter for Payload CMS that enables file uploads to Bunny Storage.

## Installation

1. Create a directory in your Payload CMS project for local plugins:

```bash
mkdir -p src/plugins/bunny-storage
```

2. Copy these files into the `src/plugins/bunny-storage` directory.

3. Install the required dependencies:

```bash
npm install @payloadcms/plugin-cloud-storage node-fetch
# or
yarn add @payloadcms/plugin-cloud-storage node-fetch
```

## Usage

In your Payload config file (typically `payload.config.ts`), import and configure the adapter:

```typescript
import { buildConfig } from 'payload/config';
import { createBunnyStorageAdapter } from './plugins/bunny-storage';

const bunnyStorageAdapter = createBunnyStorageAdapter({
  storageZoneName: 'your-storage-zone-name',
  apiKey: 'your-api-key',
  // Optional configurations:
  hostname: process.env.BUNNY_HOSTNAME,
  cdnDomain: process.env.BUNNY_CDN_DOMAIN,
  directory: process.env.BUNNY_DIRECTORY,
});

export default buildConfig({
  // ... other config options
  upload: {
    limits: {
      fileSize: 5000000, // 5MB, adjust as needed
    },
  },
  plugins: [
    cloudStorage({
      collections: {
        'your-collection-name': {
          adapter: bunnyStorageAdapter,
        },
      },
    }),
  ],
});
```

## Configuration

### Environment Variables

Configure the following environment variables in your `.env` file:

```env
BUNNY_STORAGE_ZONE_NAME=your-storage-zone-name
BUNNY_STORAGE_API_KEY=your-api-key (FTP password)
BUNNY_HOSTNAME=la.storage.bunnycdn.com
BUNNY_CDN_DOMAIN=cdn.domain.com
BUNNY_DIRECTORY=payload
```