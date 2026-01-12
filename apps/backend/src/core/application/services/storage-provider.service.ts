export const STORAGE_PROVIDER = 'StorageProvider';

export interface PresignedUrlRequest {
  filename?: string;
  contentType?: string;
}

export interface PresignedUrlResponse {
  presignedUrl: string;
  fields: Record<string, string>; // Required fields for POST upload
  fileUrl: string;
  key: string;
  expiresIn: number;
  maxFileSize: number;
}

export interface StorageProvider {
  getPresignedUrl(request?: PresignedUrlRequest): Promise<PresignedUrlResponse>;
  getPresignedUrls(
    requests: PresignedUrlRequest[],
  ): Promise<PresignedUrlResponse[]>;
}
