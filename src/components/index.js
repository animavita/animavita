import styled from 'styled-components/native';
import { THEME_COLORS } from '~/utils/constants';

export const Title = styled.Text`
  font-weight: bold;
  font-size: ${props => (props.size ? props.size : 16)};
  letter-spacing: ${props => (props.spacing ? props.spacing : 0)};
  font-family: 'Roboto';
  color: ${props => (props.color ? props.color : 'black')};
`;

export const H1 = styled.Text`
  font-weight: bold;
  font-size: ${props => (props.size ? props.size : 26)};
  color: ${THEME_COLORS.BLACK};
`;
