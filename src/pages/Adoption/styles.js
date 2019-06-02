import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { THEME_COLORS } from '~/utils/constants';

export const Container = styled.View`
  padding: 0 30px;
`;

export const FormContainer = styled.ScrollView`
  margin-top: ${16 * 0.7};
  max-height: 78%;
  margin-bottom: 15px;
`;

export const PhotoContainer = styled.View`
  margin-top: ${16 * 0.7};
  max-height: 78%;
  height: 78%;
  margin-bottom: 15px;
`;

export const ButtonGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export const styles = StyleSheet.create({
  input: {
    padding: 0,
    color: THEME_COLORS.BLACK,
  },
  picker: { height: 50, width: '100%', color: THEME_COLORS.BLACK },
});
