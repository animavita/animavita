import React from 'react';
import {fireEvent} from '@testing-library/react-native';
import {AppleButton, FacebookButton, GoogleButton} from '@animavita/ui/social';

import {Mount} from '../../../../tests/helpers';
import SignUp from '../SignUp';

test('if facebook button works', () => {
  const loginWithFbMutation = jest.fn();

  const {queryByTestId} = Mount(<FacebookButton testID="fb-btn" onPress={loginWithFbMutation} />);

  const fbBtn = queryByTestId('fb-btn');

  fireEvent.press(fbBtn!);

  expect(loginWithFbMutation).toBeCalledTimes(1);
  expect(loginWithFbMutation).not.toBeCalledTimes(0);
  expect(loginWithFbMutation).not.toBeCalledTimes(2);
});

test('if google button works', () => {
  const loginWithGoogleMutation = jest.fn();

  const {queryByTestId} = Mount(<GoogleButton testID="google-btn" onPress={loginWithGoogleMutation} />);

  const googleBtn = queryByTestId('google-btn');

  fireEvent.press(googleBtn!);

  expect(loginWithGoogleMutation).toBeCalledTimes(1);
  expect(loginWithGoogleMutation).not.toBeCalledTimes(0);
  expect(loginWithGoogleMutation).not.toBeCalledTimes(2);
});

test('if apple button works', () => {
  const loginWithAppleMutation = jest.fn();

  const {queryByTestId} = Mount(<AppleButton testID="apple-btn" onPress={loginWithAppleMutation} />);

  const appleBtn = queryByTestId('apple-btn');

  fireEvent.press(appleBtn!);

  expect(loginWithAppleMutation).toBeCalledTimes(1);
  expect(loginWithAppleMutation).not.toBeCalledTimes(0);
  expect(loginWithAppleMutation).not.toBeCalledTimes(2);
});

// to do: integration test for SignUp
