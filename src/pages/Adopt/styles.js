import styled from 'styled-components';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: #e5e5e5;
`;

export const styles = StyleSheet.create({
  content: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    justifyContent: 'flex-end',
    height: '91%',
    backgroundColor: '#FE474C',
    borderRadius: 25,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    marginTop: 10,
    shadowOpacity: 0.5,
  },
  shadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.30)',
    textShadowOffset: { width: -1, height: 5 },
    textShadowRadius: 10,
  },
  image: { borderRadius: 15 },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
