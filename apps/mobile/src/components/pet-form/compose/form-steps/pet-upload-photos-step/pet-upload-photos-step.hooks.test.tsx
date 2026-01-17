import { act, renderHook, waitFor } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { usePetPhotosPicker } from './pet-upload-photos-step.hooks';

import { getInitialPhotos } from '@/hooks/use-pet-form/use-pet-form';

jest.mock('@/shared/image-picker', () => ({
  openImageLibrary: jest.fn(),
}));

jest.mock('@/services/picture-upload', () => ({
  validateFile: jest.fn().mockResolvedValue({ valid: true }),
}));

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      photos: getInitialPhotos(),
    },
  });
  return (
    <NativeBaseProvider initialWindowMetrics={inset}>
      <FormProvider {...methods}>{children}</FormProvider>
    </NativeBaseProvider>
  );
};

describe('usePetPhotosPicker', () => {
  beforeEach(jest.restoreAllMocks);

  it('returns initial images state and pickImage function', () => {
    const { result } = renderHook(() => usePetPhotosPicker(), { wrapper: Wrapper });

    expect(result.current.photos).toEqual(getInitialPhotos());
    expect(typeof result.current.pickImage).toBe('function');
  });

  it.each([
    { index: 0, imageUri: 'image0' },
    { index: 1, imageUri: 'image1' },
    { index: 2, imageUri: 'image2' },
  ])('pickImage updates photo at index $index', async ({ index, imageUri }) => {
    const { result } = renderHook(() => usePetPhotosPicker(), { wrapper: Wrapper });

    const imagePickerUtilMock = require('@/shared/image-picker');
    imagePickerUtilMock.openImageLibrary.mockResolvedValueOnce(imageUri);

    await act(async () => {
      await result.current.pickImage(index)();
    });

    await waitFor(() => expect(result.current.photos[index]?.uri).toEqual(imageUri));
  });

  it.each([0, 1, 2])(
    'pickImage keeps photos unchanged when user cancels at index %i',
    async (index) => {
      const { result } = renderHook(() => usePetPhotosPicker(), { wrapper: Wrapper });

      const imagePickerUtilMock = require('@/shared/image-picker');
      imagePickerUtilMock.openImageLibrary.mockResolvedValueOnce(undefined);

      await act(async () => {
        await result.current.pickImage(index)();
      });

      expect(result.current.photos[index]).toEqual(getInitialPhotos()[index]);
    }
  );
});
