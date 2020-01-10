import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import HelloWorld from './src/HelloWorld';

export default function App() {
  return (
    <View style={styles.container}>
      <HelloWorld />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
