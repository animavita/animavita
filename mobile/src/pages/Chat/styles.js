import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { THEME_COLORS } from '~/utils/constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  padding: 0 30px;
  justify-content: flex-end;
  align-items: center;
`;

export const Profile = styled.View`
  flex-direction: row;
  margin-left: 15px;
  align-items: center;
`;

export const Content = styled.View`
  flex: 1;
  margin-top: 10px;
`;

export const Item = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
`;

export const styles = StyleSheet.create({
  inputContainer: {
    minHeight: 30,
    paddingHorizontal: 5,
    backgroundColor: '#fafafa',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginTop: 5,
    minHeight: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
  },

  sendLabelText: { color: THEME_COLORS.SECONDARY, fontSize: 14 },
  sendContainer: { borderWidth: 0 },

  avatar: hp('5%'),
});
