import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { useUploadPhotos } from './use-upload-photos';

import { getInitialPhotos, ImageState } from '@/hooks/use-pet-form/use-pet-form';

jest.mock('@/services/picture-upload', () => ({
  uploadMultipleFiles: jest.fn(),
}));

jest.mock('../use-locale', () => ({
  __esModule: true,
  default: () => ({
    t: (key: string) => key,
  }),
}));

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const setErrorSpy = jest.fn();
const setValueSpy = jest.fn();

describe('useUploadPhotos', () => {
  const uploadMultipleFilesMock = require('@/services/picture-upload').uploadMultipleFiles;

  beforeEach(() => {
    jest.clearAllMocks();
    setErrorSpy.mockClear();
    setValueSpy.mockClear();
  });

  it('returns initial state with uploadPhotos function', () => {
    const { result } = renderHook(() => useUploadPhotos(), {
      wrapper: createWrapper(getInitialPhotos()),
    });

    expect(typeof result.current.uploadPhotos).toBe('function');
    expect(result.current.isUploading).toBe(false);
    expect(result.current.uploadError).toBeNull();
    expect(typeof result.current.resetUploadError).toBe('function');
  });

  it('returns empty array when photos is undefined', async () => {
    const { result } = renderHook(() => useUploadPhotos(), {
      wrapper: createWrapper(undefined),
    });

    let uploadResult: string[] = [];
    await act(async () => {
      uploadResult = await result.current.uploadPhotos();
    });

    expect(uploadResult).toEqual([]);
    expect(uploadMultipleFilesMock).not.toHaveBeenCalled();
  });

  it('returns empty array when no photos are set', async () => {
    const { result } = renderHook(() => useUploadPhotos(), {
      wrapper: createWrapper(getInitialPhotos()),
    });

    let uploadResult: string[] = [];
    await act(async () => {
      uploadResult = await result.current.uploadPhotos();
    });

    expect(uploadResult).toEqual([]);
    expect(uploadMultipleFilesMock).not.toHaveBeenCalled();
  });

  it('uploads photos and returns uploaded URLs', async () => {
    const photosWithUri: ImageState[] = [
      { uri: 'file:///photo1.jpg', isUploaded: false },
      { uri: 'file:///photo2.jpg', isUploaded: false },
      { uri: '', isUploaded: false },
    ];

    uploadMultipleFilesMock.mockResolvedValueOnce({
      urls: ['https://s3.example.com/photo1.jpg', 'https://s3.example.com/photo2.jpg'],
      errors: [],
    });

    const { result } = renderHook(() => useUploadPhotos(), {
      wrapper: createWrapper(photosWithUri),
    });

    let uploadResult: string[] = [];
    await act(async () => {
      uploadResult = await result.current.uploadPhotos();
    });

    expect(uploadMultipleFilesMock).toHaveBeenCalledWith([
      'file:///photo1.jpg',
      'file:///photo2.jpg',
    ]);
    expect(uploadResult).toEqual([
      'https://s3.example.com/photo1.jpg',
      'https://s3.example.com/photo2.jpg',
    ]);
  });

  it('skips already uploaded photos', async () => {
    const photosWithMixed: ImageState[] = [
      { uri: 'https://s3.example.com/existing.jpg', isUploaded: true },
      { uri: 'file:///new-photo.jpg', isUploaded: false },
      { uri: '', isUploaded: false },
    ];

    uploadMultipleFilesMock.mockResolvedValueOnce({
      urls: ['https://s3.example.com/new-photo.jpg'],
      errors: [],
    });

    const { result } = renderHook(() => useUploadPhotos(), {
      wrapper: createWrapper(photosWithMixed),
    });

    let uploadResult: string[] = [];
    await act(async () => {
      uploadResult = await result.current.uploadPhotos();
    });

    expect(uploadMultipleFilesMock).toHaveBeenCalledWith(['file:///new-photo.jpg']);
    expect(uploadResult).toEqual([
      'https://s3.example.com/existing.jpg',
      'https://s3.example.com/new-photo.jpg',
    ]);
  });

  it('returns existing URLs when all photos are already uploaded', async () => {
    const allUploadedPhotos: ImageState[] = [
      { uri: 'https://s3.example.com/photo1.jpg', isUploaded: true },
      { uri: 'https://s3.example.com/photo2.jpg', isUploaded: true },
      { uri: '', isUploaded: false },
    ];

    const { result } = renderHook(() => useUploadPhotos(), {
      wrapper: createWrapper(allUploadedPhotos),
    });

    let uploadResult: string[] = [];
    await act(async () => {
      uploadResult = await result.current.uploadPhotos();
    });

    expect(uploadMultipleFilesMock).not.toHaveBeenCalled();
    expect(uploadResult).toEqual([
      'https://s3.example.com/photo1.jpg',
      'https://s3.example.com/photo2.jpg',
    ]);
  });

  it('sets isUploading to false after upload completes', async () => {
    const photosWithUri: ImageState[] = [
      { uri: 'file:///photo1.jpg', isUploaded: false },
      { uri: '', isUploaded: false },
      { uri: '', isUploaded: false },
    ];

    uploadMultipleFilesMock.mockResolvedValueOnce({
      urls: ['https://s3.example.com/photo1.jpg'],
      errors: [],
    });

    const { result } = renderHook(() => useUploadPhotos(), {
      wrapper: createWrapper(photosWithUri),
    });

    await act(async () => {
      await result.current.uploadPhotos();
    });

    expect(result.current.isUploading).toBe(false);
  });

  it('sets uploadError when upload fails with uploadErrors', async () => {
    const photosWithUri: ImageState[] = [
      { uri: 'file:///photo1.jpg', isUploaded: false },
      { uri: 'file:///photo2.jpg', isUploaded: false },
      { uri: '', isUploaded: false },
    ];

    uploadMultipleFilesMock.mockResolvedValueOnce({
      urls: [],
      errors: [{ index: 0, code: 'FILE_TOO_LARGE', message: 'File too large' }],
    });

    const { result } = renderHook(() => useUploadPhotos(), {
      wrapper: createWrapper(photosWithUri),
    });

    await act(async () => {
      await result.current.uploadPhotos().catch(() => {});
    });

    await waitFor(() => expect(result.current.uploadError?.message).toBe('Upload failed'));
  });

  it('sets uploadError on network errors', async () => {
    const photosWithUri: ImageState[] = [
      { uri: 'file:///photo1.jpg', isUploaded: false },
      { uri: '', isUploaded: false },
      { uri: '', isUploaded: false },
    ];

    uploadMultipleFilesMock.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useUploadPhotos(), {
      wrapper: createWrapper(photosWithUri),
    });

    await act(async () => {
      await result.current.uploadPhotos().catch(() => {});
    });

    await waitFor(() => expect(result.current.uploadError?.message).toBe('Network error'));
  });

  it('resets mutation state when resetUploadError is called', async () => {
    const photosWithUri: ImageState[] = [
      { uri: 'file:///photo1.jpg', isUploaded: false },
      { uri: '', isUploaded: false },
      { uri: '', isUploaded: false },
    ];

    uploadMultipleFilesMock.mockRejectedValueOnce(new Error('Upload failed'));

    const { result } = renderHook(() => useUploadPhotos(), {
      wrapper: createWrapper(photosWithUri),
    });

    await act(async () => {
      await result.current.uploadPhotos().catch(() => {});
    });

    await waitFor(() => expect(result.current.uploadError).toBeTruthy());

    act(() => {
      result.current.resetUploadError();
    });

    await waitFor(() => expect(result.current.uploadError).toBeNull());
  });

  it('returns empty array when photos array is empty', async () => {
    const emptyPhotos: ImageState[] = [];

    const { result } = renderHook(() => useUploadPhotos(), {
      wrapper: createWrapper(emptyPhotos),
    });

    let uploadResult: string[] = [];
    await act(async () => {
      uploadResult = await result.current.uploadPhotos();
    });

    expect(uploadResult).toEqual([]);
    expect(uploadMultipleFilesMock).not.toHaveBeenCalled();
  });

  it('updates form photos state on successful upload', async () => {
    const photosWithUri: ImageState[] = [
      { uri: 'file:///photo1.jpg', isUploaded: false },
      { uri: '', isUploaded: false },
      { uri: '', isUploaded: false },
    ];

    uploadMultipleFilesMock.mockResolvedValueOnce({
      urls: ['https://s3.example.com/photo1.jpg'],
      errors: [],
    });

    const { result } = renderHook(() => useUploadPhotosWithFormState(), {
      wrapper: createWrapper(photosWithUri),
    });

    await act(async () => {
      await result.current.uploadPhotos();
    });

    await waitFor(() => {
      const photos = result.current.getPhotos();
      expect(photos[0]).toEqual({ uri: 'https://s3.example.com/photo1.jpg', isUploaded: true });
    });
  });

  it('preserves already uploaded photos in form state on success', async () => {
    const photosWithMixed: ImageState[] = [
      { uri: 'https://s3.example.com/existing.jpg', isUploaded: true },
      { uri: 'file:///new-photo.jpg', isUploaded: false },
      { uri: '', isUploaded: false },
    ];

    uploadMultipleFilesMock.mockResolvedValueOnce({
      urls: ['https://s3.example.com/new-photo.jpg'],
      errors: [],
    });

    const { result } = renderHook(() => useUploadPhotosWithFormState(), {
      wrapper: createWrapper(photosWithMixed),
    });

    await act(async () => {
      await result.current.uploadPhotos();
    });

    await waitFor(() => {
      const photos = result.current.getPhotos();
      expect(photos[0]).toEqual({ uri: 'https://s3.example.com/existing.jpg', isUploaded: true });
    });
  });

  it('does not replace photo when already uploaded', async () => {
    const photosAllUploaded: ImageState[] = [
      { uri: 'https://s3.example.com/photo1.jpg', isUploaded: true },
      { uri: 'https://s3.example.com/photo2.jpg', isUploaded: true },
      { uri: '', isUploaded: false },
    ];

    const { result } = renderHook(() => useUploadPhotosWithFormState(), {
      wrapper: createWrapper(photosAllUploaded),
    });

    await act(async () => {
      await result.current.uploadPhotos();
    });

    await waitFor(() => {
      const photos = result.current.getPhotos();
      expect(photos[0].isUploaded).toBe(true);
      expect(photos[1].isUploaded).toBe(true);
    });
  });

  it('attaches uploadErrors to thrown error', async () => {
    const photosWithUri: ImageState[] = [
      { uri: 'file:///photo1.jpg', isUploaded: false },
      { uri: 'file:///photo2.jpg', isUploaded: false },
      { uri: '', isUploaded: false },
    ];

    uploadMultipleFilesMock.mockResolvedValueOnce({
      urls: [],
      errors: [{ index: 0, code: 'FILE_TOO_LARGE', message: 'Custom error message' }],
    });

    const { result } = renderHook(() => useUploadPhotos(), {
      wrapper: createWrapper(photosWithUri),
    });

    await act(async () => {
      await result.current.uploadPhotos().catch(() => {});
    });

    await waitFor(() => {
      const errorWithUploadErrors = result.current.uploadError as Error & {
        uploadErrors: any[];
      };
      expect(errorWithUploadErrors.uploadErrors).toBeDefined();
      expect(errorWithUploadErrors.uploadErrors[0].code).toBe('FILE_TOO_LARGE');
      expect(errorWithUploadErrors.uploadErrors[0].message).toBe('Custom error message');
      expect(errorWithUploadErrors.uploadErrors[0].index).toBe(0);
    });
  });

  it('calls setError for each upload error in onError callback', async () => {
    const photosWithUri: ImageState[] = [
      { uri: 'file:///photo1.jpg', isUploaded: false },
      { uri: 'file:///photo2.jpg', isUploaded: false },
      { uri: '', isUploaded: false },
    ];

    uploadMultipleFilesMock.mockResolvedValueOnce({
      urls: [],
      errors: [
        { index: 0, code: 'FILE_TOO_LARGE', message: 'File too large' },
        { index: 1, code: 'INVALID_TYPE', message: 'Invalid type' },
      ],
    });

    const { result } = renderHook(() => useUploadPhotos(), {
      wrapper: createWrapperWithSpies(photosWithUri),
    });

    await act(async () => {
      await result.current.uploadPhotos().catch(() => {});
    });

    await waitFor(() => {
      expect(setErrorSpy).toHaveBeenCalledWith('photos.0', {
        type: 'upload',
        message: 'REGISTER_ADOPTION.FORM.PHOTOS.ERRORS.UNKNOWN_ERROR',
      });
      expect(setErrorSpy).toHaveBeenCalledWith('photos.1', {
        type: 'upload',
        message: 'REGISTER_ADOPTION.FORM.PHOTOS.ERRORS.UNKNOWN_ERROR',
      });
    });
  });

  it('calls setError with generic error when no uploadErrors present', async () => {
    const photosWithUri: ImageState[] = [
      { uri: 'file:///photo1.jpg', isUploaded: false },
      { uri: '', isUploaded: false },
      { uri: '', isUploaded: false },
    ];

    uploadMultipleFilesMock.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useUploadPhotos(), {
      wrapper: createWrapperWithSpies(photosWithUri),
    });

    await act(async () => {
      await result.current.uploadPhotos().catch(() => {});
    });

    await waitFor(() => {
      expect(setErrorSpy).toHaveBeenCalledWith('photos', {
        type: 'upload',
        message: 'REGISTER_ADOPTION.FORM.PHOTOS.ERRORS.UNKNOWN_ERROR',
      });
    });
  });

  it('calls setValue with updated photos marking newly uploaded as isUploaded true', async () => {
    const photosWithUri: ImageState[] = [
      { uri: 'file:///photo1.jpg', isUploaded: false },
      { uri: '', isUploaded: false },
      { uri: '', isUploaded: false },
    ];

    uploadMultipleFilesMock.mockResolvedValueOnce({
      urls: ['https://s3.example.com/photo1.jpg'],
      errors: [],
    });

    const { result } = renderHook(() => useUploadPhotos(), {
      wrapper: createWrapperWithSpies(photosWithUri),
    });

    await act(async () => {
      await result.current.uploadPhotos();
    });

    await waitFor(() => {
      expect(setValueSpy).toHaveBeenCalledWith(
        'photos',
        expect.arrayContaining([
          expect.objectContaining({ uri: 'https://s3.example.com/photo1.jpg', isUploaded: true }),
        ]),
        { shouldValidate: true }
      );
    });
  });

  it('does not update photo in setValue when already marked as uploaded', async () => {
    const photosWithMixed: ImageState[] = [
      { uri: 'https://s3.example.com/existing.jpg', isUploaded: true },
      { uri: 'file:///new-photo.jpg', isUploaded: false },
      { uri: '', isUploaded: false },
    ];

    uploadMultipleFilesMock.mockResolvedValueOnce({
      urls: ['https://s3.example.com/new-photo.jpg'],
      errors: [],
    });

    const { result } = renderHook(() => useUploadPhotos(), {
      wrapper: createWrapperWithSpies(photosWithMixed),
    });

    await act(async () => {
      await result.current.uploadPhotos();
    });

    await waitFor(() => {
      expect(setValueSpy).toHaveBeenCalledWith(
        'photos',
        expect.arrayContaining([{ uri: 'https://s3.example.com/existing.jpg', isUploaded: true }]),
        { shouldValidate: true }
      );
    });
  });
});

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false, gcTime: 0 },
    },
  });

const createWrapper =
  (defaultPhotos?: ImageState[]) =>
  ({ children }: { children: React.ReactNode }) => {
    const queryClient = createQueryClient();
    const methods = useForm({
      defaultValues: {
        photos: defaultPhotos,
      },
    });
    return (
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider initialWindowMetrics={inset}>
          <FormProvider {...methods}>{children}</FormProvider>
        </NativeBaseProvider>
      </QueryClientProvider>
    );
  };

const useUploadPhotosWithFormState = () => {
  const uploadPhotos = useUploadPhotos();
  const { getValues, formState } = useFormContext();
  return {
    ...uploadPhotos,
    getPhotos: () => getValues('photos') as ImageState[],
    getErrors: () => formState.errors,
  };
};

const createWrapperWithSpies =
  (defaultPhotos?: ImageState[]) =>
  ({ children }: { children: React.ReactNode }) => {
    const queryClient = createQueryClient();
    const methods = useForm({
      defaultValues: {
        photos: defaultPhotos,
      },
    });

    const originalSetError = methods.setError;
    const originalSetValue = methods.setValue;

    methods.setError = (...args: Parameters<typeof originalSetError>) => {
      setErrorSpy(...args);
      return originalSetError(...args);
    };

    methods.setValue = (...args: Parameters<typeof originalSetValue>) => {
      setValueSpy(...args);
      return originalSetValue(...args);
    };

    return (
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider initialWindowMetrics={inset}>
          <FormProvider {...methods}>{children}</FormProvider>
        </NativeBaseProvider>
      </QueryClientProvider>
    );
  };
