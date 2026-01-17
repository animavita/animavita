export type FileInfo = {
  size: number;
  mimeType: string;
  name: string;
};

const mimeTypeMap: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
};

const generateFilename = (extension: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `image-${timestamp}-${random}.${extension}`;
};

const getExtensionFromMimeType = (mimeType: string): string => {
  const parts = mimeType.split('/');
  const subtype = parts[1] || 'jpeg';
  return subtype === 'jpeg' ? 'jpg' : subtype;
};

export const getFileInfo = async (uri: string): Promise<FileInfo> => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const extension = getExtensionFromMimeType(blob.type);
  const mimeType = mimeTypeMap[extension] || blob.type || 'image/jpeg';
  const name = generateFilename(extension);

  return {
    size: blob.size,
    mimeType,
    name,
  };
};
