import React from 'react';
import {View} from 'react-native';

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
  </View>
);
