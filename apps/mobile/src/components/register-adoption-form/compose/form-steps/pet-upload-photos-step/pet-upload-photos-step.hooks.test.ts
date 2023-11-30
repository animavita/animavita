import { act, renderHook, waitFor } from '@testing-library/react-native';

import { usePetPhotosPicker } from './pet-upload-photos-step.hooks';

jest.mock('@/shared/image-picker', () => ({
  openImageLibrary: jest.fn(),
}));

const SLOTS = [undefined, 'image1', undefined];

describe('usePetPhotosPicker', () => {
  beforeEach(jest.restoreAllMocks);

  it('returns initial images state and pickImage function', () => {
    const { result } = renderHook(() => usePetPhotosPicker());

    expect(result.current.images).toEqual([undefined, undefined, undefined]);
    expect(typeof result.current.pickImage).toBe('function');
  });

  it.each(SLOTS)('(%#) pickImage updates the images state', async (slot) => {
    const index = SLOTS.findIndex((item) => item === slot);

    const { result } = renderHook(() => usePetPhotosPicker());

    const imagePickerUtilMock = require('@/shared/image-picker');

    imagePickerUtilMock.openImageLibrary.mockResolvedValueOnce(slot);

    await act(async () => {
      result.current.pickImage(index)();
    });

    await waitFor(() => expect(result.current.images[index]).toEqual(slot));
  });
});
