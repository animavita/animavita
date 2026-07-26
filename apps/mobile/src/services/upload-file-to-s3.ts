import { PresignedUrlResponse } from '@animavita/types';

export type ReactNativeFile = {
  uri: string;
  type: string;
  name: string;
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
