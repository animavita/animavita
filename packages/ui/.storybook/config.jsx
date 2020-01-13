import React from 'react';
import {configure, addDecorator} from '@storybook/react';
import {ThemeContextProvider} from '@animavita/theme';

const Theme = StoryFn => (
  <ThemeContextProvider>
    <StoryFn />
  </ThemeContextProvider>
);

addDecorator(Theme);

const context = require.context('../stories', true, /\.stories\.js$/);

configure(context, module);
