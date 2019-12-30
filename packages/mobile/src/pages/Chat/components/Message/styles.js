import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  me: {
    padding: 10,
    marginBottom: 5,
    borderRadius: 15,
    borderBottomRightRadius: 0,
    maxWidth: width - 60,
    alignSelf: 'flex-end'
  },
  from: {
    padding: 10,
    marginBottom: 5,
    borderRadius: 15,
    borderTopLeftRadius: 0,
    maxWidth: width - 60,
    alignSelf: 'flex-start'
  }
});
