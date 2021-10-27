import React from 'react';
import styled from 'styled-components/native';
import {Slider as DefaultSlider, SliderProps} from 'react-native-elements';
import {useTheme, px2ddp} from '@animavita/theme';

import Typography from '../Typography';

const Container = styled.View`
  width: 100%;
  margin-bottom: ${px2ddp(4)}px;
`;
const StyledSlider = styled(DefaultSlider)``;

interface StyledSliderProps extends SliderProps {
  minimum: number;
  maximum: number;
  suffix: string;
  testID?: string;
}

const Slider: React.FC<StyledSliderProps> = ({...props}) => {
  const {styledTheme, themeName} = useTheme();
  const {minimum, maximum, value, suffix, onValueChange} = props;
  const lightTheme = themeName === 'light';

  return (
    <Container testID="slider">
      <StyledSlider
        minimumTrackTintColor={styledTheme.greenLight}
        maximumTrackTintColor={lightTheme ? styledTheme.greyLighter : styledTheme.greyDark}
        thumbTintColor={styledTheme.greenLight}
        thumbStyle={{
          width: px2ddp(7),
          height: px2ddp(7),
          borderColor: lightTheme ? styledTheme.white : styledTheme.black,
          borderWidth: 2,
        }}
        trackStyle={{
          height: px2ddp(2.5),
          borderRadius: px2ddp(2),
        }}
        minimumValue={minimum}
        maximumValue={maximum}
        value={value}
        onValueChange={onValueChange}
        {...props}
      />
      <Typography variant="body" color={styledTheme.greenLight}>
        {value} {suffix}
      </Typography>
    </Container>
  );
};

export default Slider;
