import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { THEME_COLORS } from '~/utils/constants';

export const Container = styled.View`
  flex: 1;
  background-color: white;
  justify-content: space-between;
  padding: 0px 30px;
`;

export const styles = StyleSheet.create({
  title: { color: THEME_COLORS.SECONDARY, fontWeight: 'bold' }
});
