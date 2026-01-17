import { uploadFileToS3 } from './upload-file-to-s3.web';

const createMockResponse = (options: {
  ok?: boolean;
  blob?: () => Promise<Blob>;
  text?: () => Promise<string>;
}) => {
  const response = {
    ok: options.ok ?? true,
    blob: options.blob ?? (() => Promise.resolve(new Blob(['test'], { type: 'image/jpeg' }))),
    text: options.text ?? (() => Promise.resolve('')),
    clone() {
      return this;
    },
  } as unknown as Response;
  return response;
};

const mockFetch = jest.fn();

describe('upload-file-to-s3.web', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = mockFetch;
  });

  it('fetches blob from URI and uploads as File object', async () => {
    const mockBlob = new Blob(['test-image-data'], { type: 'image/jpeg' });

    mockFetch
      .mockResolvedValueOnce(
        createMockResponse({
          blob: () => Promise.resolve(mockBlob),
        })
      )
      .mockResolvedValueOnce(createMockResponse({ ok: true }));

    const presignedData = {
      presignedUrl: 'https://s3.example.com/upload',
      key: 'uploads/123.jpg',
      fileUrl: 'https://cdn.example.com/123.jpg',
      fields: { 'x-amz-meta-field': 'value' },
      expiresIn: 3600,
      maxFileSize: 5242880,
    };

    await uploadFileToS3('blob:http://localhost:3000/abc-123', presignedData, 'image/jpeg');

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch).toHaveBeenNthCalledWith(1, 'blob:http://localhost:3000/abc-123');
    expect(mockFetch).toHaveBeenNthCalledWith(
      2,
      'https://s3.example.com/upload',
      expect.objectContaining({
        method: 'POST',
        body: expect.any(FormData),
      })
    );
  });

  it('appends presigned fields to form data', async () => {
    const mockBlob = new Blob(['test'], { type: 'image/png' });
    let capturedFormData: FormData | null = null;

    mockFetch
      .mockResolvedValueOnce(
        createMockResponse({
          blob: () => Promise.resolve(mockBlob),
        })
      )
      .mockImplementationOnce((_url: string, options: RequestInit) => {
        capturedFormData = options.body as FormData;
        return Promise.resolve(createMockResponse({ ok: true }));
      });

    const presignedData = {
      presignedUrl: 'https://s3.example.com/upload',
      key: 'uploads/test-image.png',
      fileUrl: 'https://cdn.example.com/test-image.png',
      fields: {
        key: 'uploads/test-image.png',
        policy: 'base64-policy',
        'x-amz-signature': 'signature123',
      },
      expiresIn: 3600,
      maxFileSize: 5242880,
    };

    await uploadFileToS3('data:image/png;base64,iVBOR...', presignedData, 'image/png');

    expect(capturedFormData).not.toBeNull();
    expect(capturedFormData!.get('key')).toBe('uploads/test-image.png');
    expect(capturedFormData!.get('policy')).toBe('base64-policy');
    expect(capturedFormData!.get('x-amz-signature')).toBe('signature123');

    const file = capturedFormData!.get('file') as File;
    expect(file).toBeInstanceOf(File);
    expect(file.name).toBe('test-image.png');
    expect(file.type).toBe('image/png');
  });

  it('throws error when upload fails', async () => {
    const mockBlob = new Blob(['test'], { type: 'image/jpeg' });

    mockFetch
      .mockResolvedValueOnce(
        createMockResponse({
          blob: () => Promise.resolve(mockBlob),
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

    const presignedData = {
      presignedUrl: 'https://s3.example.com/upload',
      key: 'uploads/123.jpg',
      fileUrl: 'https://cdn.example.com/123.jpg',
      fields: {},
      expiresIn: 3600,
      maxFileSize: 5242880,
    };

    await expect(
      uploadFileToS3('blob:http://localhost:3000/abc-123', presignedData, 'image/jpeg')
    ).rejects.toThrow('<Error><Code>AccessDenied</Code><Message>Access denied</Message></Error>');
  });

  it('extracts filename from presigned key', async () => {
    const mockBlob = new Blob(['test'], { type: 'image/jpeg' });
    let capturedFormData: FormData | null = null;

    mockFetch
      .mockResolvedValueOnce(
        createMockResponse({
          blob: () => Promise.resolve(mockBlob),
        })
      )
      .mockImplementationOnce((_url: string, options: RequestInit) => {
        capturedFormData = options.body as FormData;
        return Promise.resolve(createMockResponse({ ok: true }));
      });

    const presignedData = {
      presignedUrl: 'https://s3.example.com/upload',
      key: 'users/123/pets/456/my-pet-photo.jpg',
      fileUrl: 'https://cdn.example.com/my-pet-photo.jpg',
      fields: {},
      expiresIn: 3600,
      maxFileSize: 5242880,
    };

    await uploadFileToS3('blob:http://localhost:3000/test', presignedData, 'image/jpeg');

    const file = capturedFormData!.get('file') as File;
    expect(file.name).toBe('my-pet-photo.jpg');
  });

  it('uses default filename when key has no path', async () => {
    const mockBlob = new Blob(['test'], { type: 'image/jpeg' });
    let capturedFormData: FormData | null = null;

    mockFetch
      .mockResolvedValueOnce(
        createMockResponse({
          blob: () => Promise.resolve(mockBlob),
        })
      )
      .mockImplementationOnce((_url: string, options: RequestInit) => {
        capturedFormData = options.body as FormData;
        return Promise.resolve(createMockResponse({ ok: true }));
      });

    const presignedData = {
      presignedUrl: 'https://s3.example.com/upload',
      key: '',
      fileUrl: 'https://cdn.example.com/file.jpg',
      fields: {},
      expiresIn: 3600,
      maxFileSize: 5242880,
    };

    await uploadFileToS3('blob:http://localhost:3000/test', presignedData, 'image/jpeg');

    const file = capturedFormData!.get('file') as File;
    expect(file.name).toBe('image');
  });
});
