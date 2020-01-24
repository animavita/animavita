import React from 'react';
import {render} from 'react-native-testing-library';
import SignUp from '../SignUp';
import 'jest-styled-components/native';
import '@testing-library/jest-native/extend-expect';

import {ThemeContextProvider} from '@animavita/theme';

test('all elements are rendered', () => {
  const {queryByTestId} = render(
    <ThemeContextProvider>
      <SignUp />
    </ThemeContextProvider>,
  );

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
