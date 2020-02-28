import React from 'react';
import {Button, AsyncStorage} from 'react-native';

import {useTheme} from '@animavita/theme';
import {Background} from '@animavita/ui/layout';

const Home: React.FC = () => {
  const theme = useTheme();
  return (
    <Background>
      <Button title="Logout" onPress={() => AsyncStorage.clear()} />
      <Button title="Change theme" onPress={() => theme.changeTheme()} />
    </Background>
  );
};

export default Home;
