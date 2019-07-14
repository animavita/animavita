import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import { Logout, Container, System, styles } from './styles';
import Distance from './components/Distance';
import Personal from './components/Personal';
import Notification from './components/Notification';
import Profile from '~/components/Profile';
import useProfile from '~/hooks/useProfile';
import { Title } from '~/components';

const Settings = ({ navigation }) => {
  const user = useProfile();


  async function logoutUser() {
    await AsyncStorage.removeItem('@animativa:facebook_user');
    await AsyncStorage.removeItem('@facebook:accessData');

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'SignedOut' })],
    });
    navigation.dispatch(resetAction);
  }

  return (
    <Container>
      <Profile title="Perfil" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Personal user={user} />
        <Divider style={styles.divider} />
        <Distance />
        <Divider style={styles.divider} />
        <Notification />
        <System>
          <Logout onPress={() => logoutUser()}>

            <Title color="red" size={14} weight="normal">
              SAIR
            </Title>
          </Logout>
        </System>
      </ScrollView>
    </Container>
  );
};

export default Settings;
