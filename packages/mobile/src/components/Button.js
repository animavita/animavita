import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { THEME_COLORS } from '~/utils/constants';
import LinearGradient from 'react-native-linear-gradient';

const Container = styled.TouchableOpacity`
  border-width: 1.5px;
  padding: 8px 25px;
  border-color: ${props => (props.borderColor ? props.borderColor : THEME_COLORS.SECONDARY)};
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${props => (props.color ? props.color : 'transparent')};
`;

const Title = styled.Text`
  color: ${props => (props.color ? props.color : THEME_COLORS.SECONDARY)};
  font-size: 12;
  font-weight: ${props => (props.weight ? props.weight : 'normal')};
`;

const start = {
  x: 0,
  y: 0
};

const end = {
  x: 1,
  y: 1
};

const ButtonGradient = styled(LinearGradient)`
  justify-content: center;
  align-items: center;
  padding: 8px 25px;
  border-radius: 20px;
`;

const GradientContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const locations = [0.1, 0.9];

const Button = ({
  title,
  fontColor,
  containerColor,
  onPress,
  active,
  fontWeight,
  borderColor,
  buttonColor
}) => (active ? (
  <GradientContainer color={containerColor} activeOpacity={0.5} onPress={onPress}>
    <ButtonGradient
      start={start}
      end={end}
      locations={locations}
      colors={[THEME_COLORS.PRIMARY, THEME_COLORS.SECONDARY]}
    >
      <Title color="white" weight={fontWeight}>
        {title}
      </Title>
    </ButtonGradient>
  </GradientContainer>
) : (
  <Container borderColor={borderColor} color={buttonColor} activeOpacity={0.5} onPress={onPress}>
    <Title weight={fontWeight} color={fontColor}>
      {title}
    </Title>
  </Container>
));

Button.propTypes = {
  title: PropTypes.string.isRequired,
  fontColor: PropTypes.string,
  fontWeight: PropTypes.string,
  containerColor: PropTypes.string,
  borderColor: PropTypes.string,
  buttonColor: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  active: PropTypes.bool
};

Button.defaultProps = {
  fontColor: THEME_COLORS.SECONDARY,
  borderColor: THEME_COLORS.SECONDARY,
  buttonColor: 'transparent',
  fontWeight: '500',
  containerColor: THEME_COLORS.SECONDARY,
  active: false
};

export default Button;
