import {
  MAX_FILE_SIZE_BYTES,
  PresignedUrlRequest,
  PresignedUrlResponse,
  PresignedUrlsResponse,
} from '@animavita/types';

import client from './http-client';

export { MAX_FILE_SIZE_BYTES };

export type UploadError = {
  index: number;
  code: string;
  message: string;
};

export type FileInfo = {
  size: number;
  mimeType: string;
  name: string;
};

export type UploadResult = {
  success: boolean;
  fileUrl?: string;
  error?: UploadError;
};

export type ReactNativeFile = {
  uri: string;
  type: string;
  name: string;
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

export const uploadFileToS3 = async (
  fileUri: string,
  presignedData: PresignedUrlResponse,
  contentType: string
): Promise<void> => {
  const formData = new FormData();

  Object.entries(presignedData.fields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const fileName = presignedData.key.split('/').pop() || 'image';
  const file: ReactNativeFile = {
    uri: fileUri,
    type: contentType,
    name: fileName,
  };
  formData.append('file', file as unknown as Blob);

  const response = await fetch(presignedData.presignedUrl, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }
};

export const getFileInfo = async (uri: string): Promise<FileInfo> => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const uriParts = uri.split('/');
  const name = uriParts[uriParts.length - 1] || 'image.jpg';

  const extension = name.split('.').pop()?.toLowerCase() || 'jpg';
  const mimeTypeMap: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
  };

  return {
    size: blob.size,
    mimeType: mimeTypeMap[extension] || 'image/jpeg',
    name,
  };
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
  fileUris: string[],
  onFileUploaded?: (completed: number) => void
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

  let completedUploads = 0;
  const uploadPromises = validFiles.map(async (file, idx) => {
    const presignedData = uploads[idx];

    try {
      await uploadFileToS3(file.uri, presignedData, file.fileInfo.mimeType);
      completedUploads += 1;
      onFileUploaded?.(completedUploads);
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
