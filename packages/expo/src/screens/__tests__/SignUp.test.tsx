import React from 'react';
import {fireEvent} from '@testing-library/react-native';

import SignUp from '../SignUp';

import {Mount} from '../../../tests/helpers';
import {FacebookButton} from '@animavita/ui/social';

test('all elements are rendered', () => {
  const {queryByTestId} = Mount(<SignUp />);

  const wrapper = queryByTestId('wrapper');
  const title = queryByTestId('title');
  const subtitle = queryByTestId('subtitle');
  const image = queryByTestId('image');
  const fbBtn = queryByTestId('fb-btn');
  const googleBtn = queryByTestId('google-btn');
  const appleBtn = queryByTestId('apple-btn');

  expect(wrapper).toContainElement(title);
  expect(wrapper).toContainElement(subtitle);
  expect(wrapper).toContainElement(image);
  expect(wrapper).toContainElement(fbBtn);
  expect(wrapper).toContainElement(googleBtn);
  expect(wrapper).toContainElement(appleBtn);
});

test('if facebook button works', () => {
  const loginWithFbMutation = jest.fn();

  const {queryByTestId} = Mount(<FacebookButton testID="fb-btn" onPress={loginWithFbMutation} />);

  const fbBtn = queryByTestId('fb-btn');

  fireEvent.press(fbBtn!);

  expect(loginWithFbMutation).toBeCalledTimes(1);
  expect(loginWithFbMutation).not.toBeCalledTimes(0);
  expect(loginWithFbMutation).not.toBeCalledTimes(2);
});
