import React from 'react';

import * as componentModule from './pet-upload-photos-step.component';
import { usePetPhotosPicker } from './pet-upload-photos-step.hooks';
import { fireEvent, renderWithProviders, waitFor } from '../../../../../test/test-utils';

const { default: PetUploadPhotosStep } = componentModule;

jest.mock('./pet-upload-photos-step.hooks', () => ({
  usePetPhotosPicker: jest.fn(),
}));

const mockUsePetPhotos = (pickImage = jest.fn()) => {
  (usePetPhotosPicker as jest.Mock).mockReturnValue({
    images: [null, null, null],
    pickImage,
  });
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

  it.skip('displays camera roll permission alert when permission is not granted', async () => {
    renderWithProviders(<PetUploadPhotosStep />);

    const alert = jest.spyOn(global, 'alert').mockImplementation(() => {});

    jest.mock('../../../../../shared/image-picker', () => ({
      getPermissionStatus: () => Promise.resolve('denied'),
    }));

    await waitFor(() =>
      expect(alert).toHaveBeenCalledWith(
        "Please grant camera roll permissions inside your system's settings"
      )
    );
  });

  it.skip('displays media permission granted message when permission is granted', async () => {
    renderWithProviders(<PetUploadPhotosStep />);

    const consoleInfo = jest.spyOn(console, 'info').mockImplementation(() => {});

    jest.mock('../../../../../shared/image-picker', () => ({
      getPermissionStatus: () => Promise.resolve('granted'),
    }));

    await waitFor(() => expect(consoleInfo).toHaveBeenCalledWith('Media Permissions are granted'));
  });
});
