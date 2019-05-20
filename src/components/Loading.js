import React from 'react';
import styled from 'styled-components/native';
import { BallIndicator } from 'react-native-indicators';
import { THEME_COLORS } from '~/utils/constants';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Loading = () => (
  <Container>
    <BallIndicator color={THEME_COLORS.SECONDARY} />
  </Container>
);

export default Loading;
