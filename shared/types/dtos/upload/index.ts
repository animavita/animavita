export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
export const PHOTOS_LIMIT = 3;
export const MIN_PHOTOS_REQUIRED = 3;

export type PresignedUrlRequest = {
  filename?: string;
  contentType?: string;
};

export type PresignedUrlResponse = {
  presignedUrl: string;
  fields: Record<string, string>;
  fileUrl: string;
  key: string;
  expiresIn: number;
  maxFileSize: number;
};

export type PresignedUrlsResponse = {
  uploads: PresignedUrlResponse[];
};
