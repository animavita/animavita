import { MAX_FILE_SIZE_BYTES, PresignedUrlRequest, PresignedUrlsResponse } from '@animavita/types';

import { getFileInfo, FileInfo } from './get-file-info';
import client from './http-client';
import { uploadFileToS3, ReactNativeFile } from './upload-file-to-s3';

export { MAX_FILE_SIZE_BYTES };
export { getFileInfo, uploadFileToS3 };
export type { FileInfo, ReactNativeFile };

export type UploadError = {
  index: number;
  code: string;
  message: string;
};

export type UploadResult = {
  success: boolean;
  fileUrl?: string;
  error?: UploadError;
};

export const AWS_ERROR_CODES = {
  AccessDenied: 'ACCESS_DENIED',
  PolicyExpired: 'POLICY_EXPIRED',
  EntityTooLarge: 'FILE_TOO_LARGE',
  InvalidArgument: 'INVALID_ARGUMENT',
  MalformedPOSTRequest: 'MALFORMED_REQUEST',
  SignatureDoesNotMatch: 'SIGNATURE_MISMATCH',
  InvalidToken: 'INVALID_TOKEN',
  ExpiredToken: 'EXPIRED_TOKEN',
  Unknown: 'UNKNOWN_ERROR',
} as const;

export type AWSErrorCode = keyof typeof AWS_ERROR_CODES;

export const parseS3ErrorResponse = (xmlString: string): { code: string; message: string } => {
  const codeMatch = xmlString.match(/<Code>([^<]+)<\/Code>/);
  const messageMatch = xmlString.match(/<Message>([^<]+)<\/Message>/);

  return {
    code: codeMatch?.[1] || 'Unknown',
    message: messageMatch?.[1] || 'Unknown error occurred',
  };
};

export const getPresignedUrls = async (
  files: PresignedUrlRequest[]
): Promise<PresignedUrlsResponse> => {
  const response = await client.post<PresignedUrlsResponse>('/uploads/presigned-urls', { files });
  return response.data;
};

export const validateFile = async (
  uri: string
): Promise<{
  valid: boolean;
  error?: string;
  fileInfo?: FileInfo;
}> => {
  try {
    const fileInfo = await getFileInfo(uri);

    if (fileInfo.size > MAX_FILE_SIZE_BYTES) {
      return { valid: false, error: 'FILE_TOO_LARGE' };
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(fileInfo.mimeType)) {
      return { valid: false, error: 'INVALID_FILE_TYPE' };
    }

    return { valid: true, fileInfo };
  } catch {
    return { valid: false, error: 'FILE_READ_ERROR' };
  }
};

export const uploadMultipleFiles = async (
  fileUris: string[]
): Promise<{ urls: string[]; errors: UploadError[] }> => {
  const errors: UploadError[] = [];
  const validFiles: {
    uri: string;
    index: number;
    fileInfo: FileInfo;
  }[] = [];
  for (let i = 0; i < fileUris.length; i++) {
    const uri = fileUris[i];
    if (!uri) continue;

    const validation = await validateFile(uri);
    if (!validation.valid) {
      errors.push({
        index: i,
        code: validation.error || 'UNKNOWN_ERROR',
        message: validation.error || 'Unknown validation error',
      });
    } else if (validation.fileInfo) {
      validFiles.push({ uri, index: i, fileInfo: validation.fileInfo });
    }
  }

  if (validFiles.length === 0) {
    return { urls: [], errors };
  }

  const presignedRequests: PresignedUrlRequest[] = validFiles.map((file) => ({
    filename: file.fileInfo.name,
    contentType: file.fileInfo.mimeType,
  }));

  const { uploads } = await getPresignedUrls(presignedRequests);

  if (uploads.length !== validFiles.length) {
    throw new Error(
      `Presigned URL count mismatch: expected ${validFiles.length}, received ${uploads.length}`
    );
  }

  const uploadPromises = validFiles.map(async (file, idx) => {
    const presignedData = uploads[idx];

    try {
      await uploadFileToS3(file.uri, presignedData, file.fileInfo.mimeType);
      return { success: true, index: file.index, fileUrl: presignedData.fileUrl };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const parsed = parseS3ErrorResponse(errorMessage);

      return {
        success: false,
        index: file.index,
        error: {
          index: file.index,
          code: AWS_ERROR_CODES[parsed.code as AWSErrorCode] || AWS_ERROR_CODES.Unknown,
          message: parsed.message,
        },
      };
    }
  });

  const results = await Promise.all(uploadPromises);

  const urls: string[] = new Array(fileUris.length).fill('');

  for (const result of results) {
    if (result.success && result.fileUrl) {
      urls[result.index] = result.fileUrl;
    } else if (result.error) {
      errors.push(result.error);
    }
  }

  return { urls: urls.filter(Boolean), errors };
};
