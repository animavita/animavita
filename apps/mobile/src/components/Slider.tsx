import Slider, { SliderProps } from '@react-native-community/slider';
import React from 'react';

import theme from '../theme';

export default function RNSlider({ ...rest }: SliderProps) {
  return (
    <Slider
      minimumValue={0}
      maximumValue={1}
      minimumTrackTintColor={theme.colors.background}
      thumbTintColor={theme.colors.primary}
      maximumTrackTintColor={theme.colors.disabled}
      {...rest}
    />
  );
}
