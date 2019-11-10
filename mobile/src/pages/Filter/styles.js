import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { THEME_COLORS } from '~/utils/constants';

export const Container = styled.View`
  padding: 0 30px;
  padding-bottom: 60px;
  justify-content: space-between;
`;

export const ButtonGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export const Footer = styled.View`
  align-items: center;
  width: 100%;
  margin-top: 15px;
`;

export const ClearText = styled.TouchableOpacity`
  margin-top: 15px;
`;

export const styles = StyleSheet.create({
  picker: { height: 50, width: '100%', color: THEME_COLORS.BLACK },
});
