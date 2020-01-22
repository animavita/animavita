import React from 'react';
import {View, Text} from 'react-native';
import {Themed} from 'react-navigation';

import {useTheme} from '@animavita/theme';

const Home = () => {
  const theme = useTheme();

  return (
    <>
      <Themed.StatusBar />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
      </View>
    </>
  );
};

export default Home;
