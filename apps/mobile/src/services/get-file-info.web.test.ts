import { getFileInfo } from './get-file-info.web';

const createMockResponse = (options: { blob?: () => Promise<{ size: number; type: string }> }) => {
  const response = {
    ok: true,
    blob: options.blob ?? (() => Promise.resolve({ size: 0, type: 'image/jpeg' })),
    clone() {
      return this;
    },
  } as unknown as Response;
  return response;
};

const mockFetch = jest.fn();

describe('get-file-info.web', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = mockFetch;
    jest.spyOn(Date, 'now').mockReturnValue(1234567890);
    jest.spyOn(Math, 'random').mockReturnValue(0.123456789);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('generates filename from blob mime type for data URIs', async () => {
    mockFetch.mockResolvedValueOnce(
      createMockResponse({
        blob: () => Promise.resolve({ size: 1024, type: 'image/jpeg' }),
      })
    );

    const result = await getFileInfo('data:image/jpeg;base64,/9j/4AAQ...');

    expect(result).toEqual({
      size: 1024,
      mimeType: 'image/jpeg',
      name: 'image-1234567890-4fzzzx.jpg',
    });
  });

  it('generates filename from blob mime type for blob URIs', async () => {
    mockFetch.mockResolvedValueOnce(
      createMockResponse({
        blob: () => Promise.resolve({ size: 2048, type: 'image/png' }),
      })
    );

    const result = await getFileInfo('blob:http://localhost:3000/abc-123');

    expect(result).toEqual({
      size: 2048,
      mimeType: 'image/png',
      name: 'image-1234567890-4fzzzx.png',
    });
  });

  it('handles webp mime type', async () => {
    mockFetch.mockResolvedValueOnce(
      createMockResponse({
        blob: () => Promise.resolve({ size: 512, type: 'image/webp' }),
      })
    );

    const result = await getFileInfo('blob:http://localhost:3000/def-456');

    expect(result).toEqual({
      size: 512,
      mimeType: 'image/webp',
      name: 'image-1234567890-4fzzzx.webp',
    });
  });

  it('handles gif mime type', async () => {
    mockFetch.mockResolvedValueOnce(
      createMockResponse({
        blob: () => Promise.resolve({ size: 4096, type: 'image/gif' }),
      })
    );

    const result = await getFileInfo('blob:http://localhost:3000/gif-789');

    expect(result).toEqual({
      size: 4096,
      mimeType: 'image/gif',
      name: 'image-1234567890-4fzzzx.gif',
    });
  });

  it('defaults to jpeg for unknown mime types', async () => {
    mockFetch.mockResolvedValueOnce(
      createMockResponse({
        blob: () => Promise.resolve({ size: 256, type: 'application/octet-stream' }),
      })
    );

    const result = await getFileInfo('blob:http://localhost:3000/unknown');

    expect(result).toEqual({
      size: 256,
      mimeType: 'application/octet-stream',
      name: 'image-1234567890-4fzzzx.octet-stream',
    });
  });

  it('handles empty mime type', async () => {
    mockFetch.mockResolvedValueOnce(
      createMockResponse({
        blob: () => Promise.resolve({ size: 128, type: '' }),
      })
    );

    const result = await getFileInfo('blob:http://localhost:3000/empty');

    expect(result).toEqual({
      size: 128,
      mimeType: 'image/jpeg',
      name: 'image-1234567890-4fzzzx.jpg',
    });
  });
});
