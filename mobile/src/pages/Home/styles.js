import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { THEME_COLORS } from '~/utils/constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const Container = styled.View`
  flex: 1;
  margin-top: 30px;
`;

export const Header = styled.View`
  padding: 0px ${`${Math.floor(hp('2%'))}px`};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Tabs = styled.View`
  border-bottom-color: #c5ccd6;
  border-bottom-width: 0.5;
  margin-top: 25px;

  flex-direction: row;
`;

export const TabContainer = styled.View`
  padding: ${`${Math.floor(hp('2%'))}px`} ${`${Math.floor(hp('2%'))}px`};
`;

export const TabButton = styled.TouchableOpacity`
  margin-right: 32px;
  padding-bottom: 16;

  border-bottom-color: ${props => (props.active ? THEME_COLORS.SECONDARY : '#c5ccd6')};
  border-bottom-width: ${props => (props.active ? 3 : 0.1)};
`;

export const TabTitle = styled.Text`
  font-weight: 500;
  font-size: ${hp('2.5%')};
  color: ${props => (props.active ? THEME_COLORS.SECONDARY : '#9DA3B4')};
`;


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  card: {
    flex: 1,
    borderRadius: 4,
    marginTop: 0,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
});
