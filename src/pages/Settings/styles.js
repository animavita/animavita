import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  flex: 1;
  padding: 0 30px;
`;

export const System = styled.View`
  align-items: center;
  justify-content: center;
  margin: 20px 0px;
`;

export const Logout = styled.TouchableOpacity``;

export const styles = StyleSheet.create({
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: '#C5CCD6', marginTop: 16 * 2 },
});
