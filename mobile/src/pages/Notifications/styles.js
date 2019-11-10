import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  flex: 1;
  padding: 0 30px;
`;

export const Content = styled.View`
  margin-top: ${25 * 0.7};
  flex: 1;
`;

export const styles = StyleSheet.create({
  loadingContainer: {
    marginVertical: 10,
  },
});
