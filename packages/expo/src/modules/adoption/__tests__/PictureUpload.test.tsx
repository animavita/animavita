import React from 'react';
import {fireEvent} from '@testing-library/react-native';
import {Mount} from '@animavita/expo/tests/helpers';

import {AdoptionProvider, AdoptionContextProps} from '../Controller';
import PictureUpload from '../PictureUpload';

const mockedGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      goBack: mockedGoBack,
    }),
  };
});

const mountFactory = (contextOverrides?: Partial<AdoptionContextProps>) => {
  return Mount(
    <AdoptionProvider {...contextOverrides}>
      <PictureUpload />
    </AdoptionProvider>,
  );
};

describe('PictureUpload screen', () => {
  it('render all inputs', () => {
    const {getAllByTestId} = mountFactory();

    const pixtureBox = getAllByTestId('pictureBox');

    expect(pixtureBox).toHaveLength(3);
  });

  describe('click on picture box', () => {
    it('call pickImage when there is no image', () => {
      const pickImage = jest.fn();

      const {getAllByTestId} = mountFactory({pickImage, images: []});

      const button = getAllByTestId('pictureBox')[0];

      fireEvent.press(button);

      expect(pickImage).toHaveBeenCalledTimes(1);
    });

    it('call removeImage when there is image', () => {
      const removeImage = jest.fn();

      const {getAllByTestId} = mountFactory({removeImage, images: [{cancelled: false, uri: ''}]});

      const button = getAllByTestId('pictureBox')[0];

      fireEvent.press(button);

      expect(removeImage).toHaveBeenCalledTimes(1);
    });
  });

  it('call submitAdoption when press button', () => {
    const submitAdoption = jest.fn();

    const {getByTestId} = mountFactory({submitAdoption});

    const button = getByTestId('submitButton');

    fireEvent.press(button);

    expect(submitAdoption).toHaveBeenCalledTimes(1);
  });

  it('call previousStep when press back button', () => {
    const previousStep = jest.fn();

    const {getByTestId} = mountFactory({previousStep});

    const button = getByTestId('backButton');

    fireEvent.press(button);

    expect(previousStep).toHaveBeenCalledTimes(1);
  });
});
