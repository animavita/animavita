import styled from 'styled-components';

export const Container = styled.View`
  height: 10%;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #ffffff;
`;

export const PetType = styled.Text`
  font-weight: bold;
  font-size: ${props => (props.size ? props.size : 16)};
  font-family: 'Roboto';
  color: black;
`;

export const Center = styled.View`
  align-items: center;
`;
