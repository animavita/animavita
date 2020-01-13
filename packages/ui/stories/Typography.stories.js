import React from 'react';
import {View} from 'react-native';
import {ThemeConsumer} from 'styled-components/native';

import Typography from '../src/core/Typography';

export default {
  title: 'Typography',
  component: Typography,
};

export const variant = () => (
  <View>
    <Typography variant="large-title">Large title</Typography>
    <Typography variant="title-1">Title1</Typography>
    <Typography variant="title-2">Title2</Typography>
    <Typography variant="title-3">Title3</Typography>
    <Typography variant="headline">Headline</Typography>
    <Typography variant="body">Body</Typography>
    <Typography variant="callout">Callout</Typography>
    <Typography variant="subheadline">Subheadline</Typography>
    <Typography variant="footnote">Footnote</Typography>
    <Typography variant="caption-1">Caption1</Typography>
    <Typography variant="caption-2">Caption2</Typography>
  </View>
);

export const type = () => (
  <View>
    <Typography variant="body" type="bold">
      Bold
    </Typography>
    <Typography variant="body" type="italic">
      Italic
    </Typography>
  </View>
);

export const color = () => (
  <ThemeConsumer>
    {theme => (
      <Typography variant="large-title" type="bold" color={theme.greenLight}>
        Green theme text
      </Typography>
    )}
  </ThemeConsumer>
);
