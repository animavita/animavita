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

export const getFileInfo = async (uri: string): Promise<FileInfo> => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const uriParts = uri.split('/');
  const name = uriParts[uriParts.length - 1] || 'image.jpg';

  const extension = name.split('.').pop()?.toLowerCase() || 'jpg';

  return {
    size: blob.size,
    mimeType: mimeTypeMap[extension] || 'image/jpeg',
    name,
  };
};
