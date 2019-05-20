import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { THEME_COLORS } from '~/utils/constants';

const Container = styled.TouchableOpacity`
  border-width: 1.5px;
  padding: 8px 25px;
  border-color: ${THEME_COLORS.SECONDARY};
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const Title = styled.Text`
  color: ${THEME_COLORS.SECONDARY};
  font-size: 12;
`;

const Button = ({ title, fontColor, containerColor }) => (
  <Container color={containerColor}>
    <Title color={fontColor}>{title}</Title>
  </Container>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  fontColor: PropTypes.string,
  containerColor: PropTypes.string,
};

Button.defaultProps = {
  fontColor: THEME_COLORS.SECONDARY,
  containerColor: THEME_COLORS.SECONDARY,
};

export default Button;
