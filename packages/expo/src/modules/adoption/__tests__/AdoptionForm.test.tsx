import React from 'react';
import {fireEvent} from '@testing-library/react-native';

import {AdoptionProvider, AdoptionContextProps} from '../Controller';
import AdoptionForm from '../AdoptionForm';
import {Mount} from '../../../../tests/helpers';

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
      <AdoptionForm />
    </AdoptionProvider>,
  );
};

describe('AdoptionForm screen', () => {
  it('render all inputs', () => {
    const {getAllByTestId} = mountFactory();

    const textInputs = getAllByTestId('textInput');
    const slider = getAllByTestId('slider');
    const buttonGroup = getAllByTestId('buttonGroup');

    expect(textInputs).toHaveLength(3);
    expect(slider).toHaveLength(1);
    expect(buttonGroup).toHaveLength(3);
  });

  it('call submitData when press button', () => {
    const submitData = jest.fn();

    const {getByTestId} = mountFactory({submitData});

    const button = getByTestId('nextButton');

    fireEvent.press(button);

    expect(submitData).toHaveBeenCalledTimes(1);
  });

  it('call goBack when press back button', () => {
    const {getByTestId} = mountFactory();

    const button = getByTestId('backButton');

    fireEvent.press(button);

    expect(mockedGoBack).toHaveBeenCalledTimes(1);
  });
});
