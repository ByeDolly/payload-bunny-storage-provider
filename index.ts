import type { BunnyStorageConfig } from './types';
import type { StorageAdapter } from '@payloadcms/plugin-cloud-storage/types';
import { generateURL } from './generateURL';
import { handleUpload } from './handleUpload';
import { handleDelete } from './handleDelete';
import { staticHandler } from './staticHandler';

export const createBunnyStorageAdapter = (
  config: BunnyStorageConfig
): (() => StorageAdapter) => {
  return () => {
    const {
      storageZoneName,
      apiKey,
      hostname = process.env.BUNNY_HOSTNAME || 'la.storage.bunnycdn.com',
      cdnDomain = process.env.BUNNY_CDN_DOMAIN || 'cdn.showzone.gg',
      directory = process.env.BUNNY_DIRECTORY || 'payload',
    } = config;
 
    const storageEndpoint = `https://${hostname}/${storageZoneName}`;
    const cdnEndpoint = `https://${cdnDomain}`;

    return {
      name: 'bunny-storage',
      generateURL: generateURL({ cdnEndpoint, prefix: directory }),
      handleUpload: handleUpload({ storageEndpoint, apiKey, prefix: directory }),
      handleDelete: handleDelete({ storageEndpoint, apiKey, prefix: directory }),
      staticHandler: staticHandler({ cdnEndpoint, prefix: directory }),
    };
  };
};
