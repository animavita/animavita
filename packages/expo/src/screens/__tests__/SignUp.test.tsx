import React from 'react';

import SignUp from '../SignUp';

import {Mount} from '../../../tests/helpers';

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
