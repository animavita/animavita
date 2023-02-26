import { act, renderHook, waitFor } from '@testing-library/react-native';

import { usePetPhotosPicker } from './pet-upload-photos-step.hooks';

jest.mock('../../../../../shared/image-picker', () => ({
  openImageLibrary: jest.fn(),
}));

describe('usePetPhotosPicker', () => {
  beforeEach(jest.restoreAllMocks);

  it('returns initial images state and pickImage function', () => {
    const { result } = renderHook(() => usePetPhotosPicker());

    expect(result.current.images).toEqual([undefined, undefined, undefined]);
    expect(typeof result.current.pickImage).toBe('function');
  });

  it('pickImage updates the images state', async () => {
    const { result } = renderHook(() => usePetPhotosPicker());

    const imagePickerUtilMock = require('../../../../../shared/image-picker');

    imagePickerUtilMock.openImageLibrary.mockResolvedValueOnce('image1');

    await act(async () => {
      await result.current.pickImage(1)();
    });

    await waitFor(() => expect(result.current.images).toEqual([undefined, 'image1', undefined]));
  });
});
