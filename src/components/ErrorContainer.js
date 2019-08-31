import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Title } from '~/components';
import { THEME_COLORS } from '~/utils/constants';

export const ImageContainer = styled.View`
  flex: 1;
  align-items: center;
`;

export const styles = StyleSheet.create({
  image: {
    width: '80%',
    height: '80%',
    marginBottom: -35,
  },
});

const ErrorContainer = ({ image, title, description }) => (
  <ImageContainer>
    <Image resizeMode="contain" style={styles.image} source={image} />
    <Title size={18} align="center" color={THEME_COLORS.BLACK}>
      {title}
    </Title>
    <Title size={13} align="center" weight="normal" color={THEME_COLORS.GREY}>
      {description}
    </Title>
  </ImageContainer>
);

ErrorContainer.propTypes = {
  image: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
export default ErrorContainer;
