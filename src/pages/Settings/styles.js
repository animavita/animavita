import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { THEME_COLORS } from '~/utils/constants';

export const Container = styled.View`
  flex: 1;
  padding: 0 30px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Profile = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Form = styled.View`
  margin-top: ${16 * 0.7};
`;

export const Input = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  margin: 10px 0;
`;

export const Field = styled.Text`
  color: #c5ccd6;
  margin-bottom: 5;
  font-size: 14;
`;

export const Small = styled.Text`
  color: #2bda8e;
  font-size: 14;
`;

export const styles = StyleSheet.create({
  input: {
    padding: 0,
    color: THEME_COLORS.BLACK,
  },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: '#C5CCD6', marginTop: 16 * 2 },
  thumb: {
    width: 16,
    height: 16,
    borderRadius: 16,
    borderColor: 'white',
    borderWidth: 3,
    backgroundColor: '#2bda8e',
  },
});
