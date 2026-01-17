import { PresignedUrlRequest, PresignedUrlResponse } from '@animavita/types';

export const STORAGE_PROVIDER = 'StorageProvider';

export type { PresignedUrlRequest, PresignedUrlResponse };

export interface StorageProvider {
  getPresignedUrl(request?: PresignedUrlRequest): Promise<PresignedUrlResponse>;
  getPresignedUrls(
    requests: PresignedUrlRequest[],
  ): Promise<PresignedUrlResponse[]>;
}
