import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const TopButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 30px;
  margin-bottom: 10px;
`;

export const ImageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const styles = StyleSheet.create({
  image: { width: '100%', height: '80%', marginTop: -15 },
});
