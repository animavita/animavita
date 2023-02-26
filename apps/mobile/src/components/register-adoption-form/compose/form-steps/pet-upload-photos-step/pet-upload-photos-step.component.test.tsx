import React from 'react';

import * as componentModule from './pet-upload-photos-step.component';
import { usePetPhotosPicker } from './pet-upload-photos-step.hooks';
import { fireEvent, renderWithProviders, waitFor } from '../../../../../test/test-utils';

const { default: PetUploadPhotosStep } = componentModule;

jest.mock('./pet-upload-photos-step.hooks', () => ({
  usePetPhotosPicker: jest.fn(),
}));

const usePetPhotosPickerMock = (pickImage = jest.fn()) => {
  (usePetPhotosPicker as jest.Mock).mockReturnValue({
    images: [null, null, null],
    pickImage,
  });
};

describe('PetUploadPhotosStep', () => {
  const pickImage = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    usePetPhotosPickerMock();

    const { getByTestId } = renderWithProviders(<PetUploadPhotosStep />);

    expect(getByTestId('Photo 1')).toBeTruthy();
    expect(getByTestId('Photo 2')).toBeTruthy();
    expect(getByTestId('Photo 3')).toBeTruthy();
  });

  it('calls pickImage when an image is pressed', () => {
    usePetPhotosPickerMock(pickImage);

    const { getByTestId } = renderWithProviders(<PetUploadPhotosStep />);

    fireEvent.press(getByTestId('Photo 1'));
    expect(pickImage).toHaveBeenCalledWith(0);
    fireEvent.press(getByTestId('Photo 2'));
    expect(pickImage).toHaveBeenCalledWith(1);
    fireEvent.press(getByTestId('Photo 3'));
    expect(pickImage).toHaveBeenCalledWith(2);
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
