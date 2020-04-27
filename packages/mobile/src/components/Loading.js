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

const Loading = ({ size, color, style }) => (
  <Container testID="loading">
    <BallIndicator style={style} size={size} color={color} />
  </Container>
);

Loading.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.shape({})
};

Loading.defaultProps = {
  size: 40,
  color: THEME_COLORS.SECONDARY,
  style: {}
};
export default Loading;
