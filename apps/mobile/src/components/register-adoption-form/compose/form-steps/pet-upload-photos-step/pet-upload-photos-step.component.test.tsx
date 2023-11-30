import React from 'react';

import * as componentModule from './pet-upload-photos-step.component';
import { usePetPhotosPicker } from './pet-upload-photos-step.hooks';

import { fireEvent, renderWithProviders } from '@/test/test-utils';

const { default: PetUploadPhotosStep } = componentModule;

jest.mock('./pet-upload-photos-step.hooks', () => ({
  usePetPhotosPicker: jest.fn(),
}));

jest.mock('@/shared/image-picker', () => ({
  getPermissionStatus: jest.fn(),
}));

const mockUsePetPhotos = (pickImage = jest.fn()) => {
  (usePetPhotosPicker as jest.Mock).mockReturnValue({
    images: [null, null, null],
    pickImage,
  });
};

const IMAGE_SLOTS_IDENTIFIERS = ['principal', 'segunda', 'terceira'];

describe('PetUploadPhotosStep', () => {
  const pickImage = jest.fn();

  afterEach(jest.clearAllMocks);

  it.each(IMAGE_SLOTS_IDENTIFIERS)('renders %s slot correctly', (slot) => {
    mockUsePetPhotos();

    const { getByAccessibilityHint } = renderWithProviders(<PetUploadPhotosStep />);

    expect(getByAccessibilityHint(`selecione a ${slot} foto do pet`)).toBeTruthy();
  });

  describe.each(IMAGE_SLOTS_IDENTIFIERS)('when %s slot is pressed', (slot) => {
    const index = IMAGE_SLOTS_IDENTIFIERS.findIndex((item) => item === slot);

    it(`calls pickImage with ${index} index`, () => {
      mockUsePetPhotos(pickImage);

      const { getByAccessibilityHint } = renderWithProviders(<PetUploadPhotosStep />);

      fireEvent.press(getByAccessibilityHint(`selecione a ${slot} foto do pet`));

      expect(pickImage).toHaveBeenCalledWith(index);
    });
  });
});
