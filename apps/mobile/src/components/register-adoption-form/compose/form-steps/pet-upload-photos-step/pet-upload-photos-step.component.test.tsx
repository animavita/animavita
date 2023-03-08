import React from 'react';

import * as componentModule from './pet-upload-photos-step.component';
import { usePetPhotosPicker } from './pet-upload-photos-step.hooks';
import imagePickerUtil from '../../../../../shared/image-picker';
import { fireEvent, renderWithProviders, waitFor } from '../../../../../test/test-utils';

const { default: PetUploadPhotosStep } = componentModule;

jest.mock('./pet-upload-photos-step.hooks', () => ({
  usePetPhotosPicker: jest.fn(),
}));

jest.mock('../../../../../shared/image-picker', () => ({
  getPermissionStatus: jest.fn(),
}));

const mockUsePetPhotos = (pickImage = jest.fn()) => {
  (usePetPhotosPicker as jest.Mock).mockReturnValue({
    images: [null, null, null],
    pickImage,
  });
};

const mockGetPermissionStatus = (status: string) => {
  (imagePickerUtil.getPermissionStatus as jest.Mock).mockResolvedValue(status);
};

const IMAGE_SLOTS_IDENTIFIERS = ['first', 'second', 'third'];

describe('PetUploadPhotosStep', () => {
  const pickImage = jest.fn();

  afterEach(jest.clearAllMocks);

  it.each(IMAGE_SLOTS_IDENTIFIERS)('renders %s slot correctly', (slot) => {
    mockUsePetPhotos();

    const { getByAccessibilityHint } = renderWithProviders(<PetUploadPhotosStep />);

    expect(getByAccessibilityHint(`uploads the ${slot} pet picture`)).toBeTruthy();
  });

  describe.each(IMAGE_SLOTS_IDENTIFIERS)('when %s slot is pressed', (slot) => {
    const index = IMAGE_SLOTS_IDENTIFIERS.findIndex((item) => item === slot);

    it(`calls pickImage with ${index} index`, () => {
      mockUsePetPhotos(pickImage);

      const { getByAccessibilityHint } = renderWithProviders(<PetUploadPhotosStep />);

      fireEvent.press(getByAccessibilityHint(`uploads the ${slot} pet picture`));

      expect(pickImage).toHaveBeenCalledWith(index);
    });
  });

  it('displays camera roll permission alert when permission is not granted', async () => {
    mockUsePetPhotos();
    mockGetPermissionStatus('denied');

    global.alert = jest.fn();

    renderWithProviders(<PetUploadPhotosStep />);

    await waitFor(() =>
      expect(global.alert).toHaveBeenLastCalledWith('Animavita precisa do acesso a câmera')
    );
  });

  it('displays media permission granted message when permission is granted', async () => {
    mockUsePetPhotos();
    mockGetPermissionStatus('granted');

    console.info = jest.fn();

    renderWithProviders(<PetUploadPhotosStep />);

    await waitFor(() => expect(console.info).toHaveBeenCalledWith('Media Permissions are granted'));
  });
});
