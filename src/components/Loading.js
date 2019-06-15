import React from 'react';
import styled from 'styled-components/native';
import { BallIndicator } from 'react-native-indicators';
import PropTypes from 'prop-types';
import { THEME_COLORS } from '~/utils/constants';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Loading = ({ size, color }) => (
  <Container>
    <BallIndicator size={size} color={color} />
  </Container>
);

Loading.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

Loading.defaultProps = {
  size: 40,
  color: THEME_COLORS.SECONDARY,
};
export default Loading;
