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

  const response = await fetch(fileUri);
  const blob = await response.blob();

  const fileName = presignedData.key.split('/').pop() || 'image';
  const file = new File([blob], fileName, { type: contentType });
  formData.append('file', file);

  const uploadResponse = await fetch(presignedData.presignedUrl, {
    method: 'POST',
    body: formData,
  });

  if (!uploadResponse.ok) {
    const errorText = await uploadResponse.text();
    throw new Error(errorText);
  }
};
