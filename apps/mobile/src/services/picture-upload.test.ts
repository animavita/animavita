import client from './http-client';
import {
  parseS3ErrorResponse,
  getFileInfo,
  validateFile,
  uploadFileToS3,
  getPresignedUrls,
  uploadMultipleFiles,
  AWS_ERROR_CODES,
  MAX_FILE_SIZE_BYTES,
} from './picture-upload';

import { server } from '@/test/msw/server';

jest.mock('./http-client', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

const createMockResponse = (options: {
  ok?: boolean;
  blob?: () => Promise<{ size: number }>;
  text?: () => Promise<string>;
}) => {
  const response = {
    ok: options.ok ?? true,
    blob: options.blob ?? (() => Promise.resolve({ size: 0 })),
    text: options.text ?? (() => Promise.resolve('')),
    clone() {
      return this;
    },
  } as unknown as Response;
  return response;
};

const mockFetch = jest.fn();

describe('picture-upload service', () => {
  beforeAll(() => {
    server.close();
  });

  afterAll(() => {
    server.listen();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = mockFetch;
  });

  describe('parseS3ErrorResponse', () => {
    it('parses code and message from S3 XML error response', () => {
      const xml = '<Error><Code>AccessDenied</Code><Message>Access denied</Message></Error>';

      const result = parseS3ErrorResponse(xml);

      expect(result).toEqual({
        code: 'AccessDenied',
        message: 'Access denied',
      });
    });

    it('returns Unknown values when XML is malformed', () => {
      const xml = '<Error>Invalid XML</Error>';

      const result = parseS3ErrorResponse(xml);

      expect(result).toEqual({
        code: 'Unknown',
        message: 'Unknown error occurred',
      });
    });

    it('handles empty string', () => {
      const result = parseS3ErrorResponse('');

      expect(result).toEqual({
        code: 'Unknown',
        message: 'Unknown error occurred',
      });
    });
  });

  describe('getFileInfo', () => {
    it('extracts file info from URI', async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse({
          blob: () => Promise.resolve({ size: 1024 }),
        })
      );

      const result = await getFileInfo('file:///path/to/photo.jpg');

      expect(result).toEqual({
        size: 1024,
        mimeType: 'image/jpeg',
        name: 'photo.jpg',
      });
    });

    it('handles png extension', async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse({
          blob: () => Promise.resolve({ size: 2048 }),
        })
      );

      const result = await getFileInfo('file:///path/to/image.png');

      expect(result).toEqual({
        size: 2048,
        mimeType: 'image/png',
        name: 'image.png',
      });
    });

    it('defaults to image/jpeg for unknown extensions', async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse({
          blob: () => Promise.resolve({ size: 512 }),
        })
      );

      const result = await getFileInfo('file:///path/to/file.unknown');

      expect(result).toEqual({
        size: 512,
        mimeType: 'image/jpeg',
        name: 'file.unknown',
      });
    });

    it('handles URI without file name', async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse({
          blob: () => Promise.resolve({ size: 256 }),
        })
      );

      const result = await getFileInfo('file:///');

      expect(result).toEqual({
        size: 256,
        mimeType: 'image/jpeg',
        name: 'image.jpg',
      });
    });
  });

  describe('validateFile', () => {
    it('returns valid for a proper image file', async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse({
          blob: () => Promise.resolve({ size: 1024 }),
        })
      );

      const result = await validateFile('file:///path/to/photo.jpg');

      expect(result.valid).toBe(true);
      expect(result.fileInfo).toEqual({
        size: 1024,
        mimeType: 'image/jpeg',
        name: 'photo.jpg',
      });
    });

    it('returns FILE_TOO_LARGE error when file exceeds max size', async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse({
          blob: () => Promise.resolve({ size: MAX_FILE_SIZE_BYTES + 1 }),
        })
      );

      const result = await validateFile('file:///path/to/large-file.jpg');

      expect(result.valid).toBe(false);
      expect(result.error).toBe('FILE_TOO_LARGE');
    });

    it('returns FILE_READ_ERROR when fetch fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await validateFile('file:///invalid/path');

      expect(result.valid).toBe(false);
      expect(result.error).toBe('FILE_READ_ERROR');
    });
  });

  describe('getPresignedUrls', () => {
    it('calls the API with file requests', async () => {
      const mockResponse = {
        uploads: [
          {
            presignedUrl: 'https://s3.example.com/upload',
            key: 'uploads/123.jpg',
            fileUrl: 'https://cdn.example.com/123.jpg',
            fields: { key: 'value' },
            expiresIn: 3600,
            maxFileSize: 5242880,
          },
        ],
      };

      (client.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

      const files = [{ filename: 'photo.jpg', contentType: 'image/jpeg' }];
      const result = await getPresignedUrls(files);

      expect(client.post).toHaveBeenCalledWith('/uploads/presigned-urls', { files });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('uploadFileToS3', () => {
    it('uploads file using presigned URL and form data', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({ ok: true }));

      const presignedData = {
        presignedUrl: 'https://s3.example.com/upload',
        key: 'uploads/123.jpg',
        fileUrl: 'https://cdn.example.com/123.jpg',
        fields: { 'x-amz-meta-field': 'value' },
        expiresIn: 3600,
        maxFileSize: 5242880,
      };

      await uploadFileToS3('file:///path/to/photo.jpg', presignedData, 'image/jpeg');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://s3.example.com/upload',
        expect.objectContaining({
          method: 'POST',
          body: expect.any(FormData),
        })
      );
    });

    it('throws error when upload fails', async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse({
          ok: false,
          text: () =>
            Promise.resolve(
              '<Error><Code>AccessDenied</Code><Message>Access denied</Message></Error>'
            ),
        })
      );

      const presignedData = {
        presignedUrl: 'https://s3.example.com/upload',
        key: 'uploads/123.jpg',
        fileUrl: 'https://cdn.example.com/123.jpg',
        fields: {},
        expiresIn: 3600,
        maxFileSize: 5242880,
      };

      await expect(
        uploadFileToS3('file:///path/to/photo.jpg', presignedData, 'image/jpeg')
      ).rejects.toThrow('<Error><Code>AccessDenied</Code><Message>Access denied</Message></Error>');
    });
  });

  describe('uploadMultipleFiles', () => {
    it('returns errors when validation fails', async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse({
          blob: () => Promise.resolve({ size: MAX_FILE_SIZE_BYTES + 1 }),
        })
      );

      const result = await uploadMultipleFiles(['file:///large-file.jpg']);

      expect(result.urls).toEqual([]);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].code).toBe('FILE_TOO_LARGE');
    });

    it('uploads valid files and returns URLs', async () => {
      mockFetch
        .mockResolvedValueOnce(
          createMockResponse({
            blob: () => Promise.resolve({ size: 1024 }),
          })
        )
        .mockResolvedValueOnce(createMockResponse({ ok: true }));

      const mockPresignedResponse = {
        uploads: [
          {
            presignedUrl: 'https://s3.example.com/upload',
            key: 'uploads/123.jpg',
            fileUrl: 'https://cdn.example.com/123.jpg',
            fields: {},
            expiresIn: 3600,
            maxFileSize: 5242880,
          },
        ],
      };

      (client.post as jest.Mock).mockResolvedValueOnce({ data: mockPresignedResponse });

      const result = await uploadMultipleFiles(['file:///photo.jpg']);

      expect(result.urls).toEqual(['https://cdn.example.com/123.jpg']);
      expect(result.errors).toHaveLength(0);
    });

    it('handles S3 upload errors and parses error response', async () => {
      mockFetch
        .mockResolvedValueOnce(
          createMockResponse({
            blob: () => Promise.resolve({ size: 1024 }),
          })
        )
        .mockResolvedValueOnce(
          createMockResponse({
            ok: false,
            text: () =>
              Promise.resolve(
                '<Error><Code>AccessDenied</Code><Message>Access denied</Message></Error>'
              ),
          })
        );

      const mockPresignedResponse = {
        uploads: [
          {
            presignedUrl: 'https://s3.example.com/upload',
            key: 'uploads/123.jpg',
            fileUrl: 'https://cdn.example.com/123.jpg',
            fields: {},
            expiresIn: 3600,
            maxFileSize: 5242880,
          },
        ],
      };

      (client.post as jest.Mock).mockResolvedValueOnce({ data: mockPresignedResponse });

      const result = await uploadMultipleFiles(['file:///photo.jpg']);

      expect(result.urls).toEqual([]);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].code).toBe(AWS_ERROR_CODES.AccessDenied);
      expect(result.errors[0].message).toBe('Access denied');
    });

    it('returns empty results when no files provided', async () => {
      const result = await uploadMultipleFiles([]);

      expect(result.urls).toEqual([]);
      expect(result.errors).toHaveLength(0);
    });

    it('uploads valid files even when some fail validation (partial success)', async () => {
      mockFetch
        .mockResolvedValueOnce(
          createMockResponse({
            blob: () => Promise.resolve({ size: MAX_FILE_SIZE_BYTES + 1 }),
          })
        )
        .mockResolvedValueOnce(
          createMockResponse({
            blob: () => Promise.resolve({ size: 1024 }),
          })
        )
        .mockResolvedValueOnce(createMockResponse({ ok: true }));

      const mockPresignedResponse = {
        uploads: [
          {
            presignedUrl: 'https://s3.example.com/upload',
            key: 'uploads/valid.jpg',
            fileUrl: 'https://cdn.example.com/valid.jpg',
            fields: {},
            expiresIn: 3600,
            maxFileSize: 5242880,
          },
        ],
      };

      (client.post as jest.Mock).mockResolvedValueOnce({ data: mockPresignedResponse });

      const result = await uploadMultipleFiles([
        'file:///large-file.jpg',
        'file:///valid-file.jpg',
      ]);

      expect(result.urls).toEqual(['https://cdn.example.com/valid.jpg']);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].index).toBe(0);
      expect(result.errors[0].code).toBe('FILE_TOO_LARGE');
    });

    it('throws error when presigned URL count does not match files count', async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse({
          blob: () => Promise.resolve({ size: 1024 }),
        })
      );

      const mockPresignedResponse = {
        uploads: [],
      };

      (client.post as jest.Mock).mockResolvedValueOnce({ data: mockPresignedResponse });

      await expect(uploadMultipleFiles(['file:///photo.jpg'])).rejects.toThrow(
        'Presigned URL count mismatch: expected 1, received 0'
      );
    });
  });
});
