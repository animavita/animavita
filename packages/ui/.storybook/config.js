import {configure} from '@storybook/react';

const context = require.context('../stories', true, /\.stories\.js$/);

configure(context, module);
