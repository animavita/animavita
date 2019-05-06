import styled from 'styled-components';

export const Title = styled.Text`
  font-weight: bold;
  font-size: ${props => (props.size ? props.size : 16)};
  letter-spacing: ${props => (props.spacing ? props.spacing : 0)};
  font-family: 'Roboto';
  color: ${props => (props.color ? props.color : 'black')};
`;
