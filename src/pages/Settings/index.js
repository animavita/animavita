import React from 'react';
import { ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import { Container, styles } from './styles';
import Distance from './components/Distance';
import Personal from './components/Personal';
import Notification from './components/Notification';
import Profile from '~/components/Profile';
import useProfile from '~/hooks/useProfile';

const Settings = () => {
  const user = useProfile();
  return (
    <Container>
      <Profile title="Perfil" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Personal user={user} />
        <Divider style={styles.divider} />
        <Distance />
        <Divider style={styles.divider} />
        <Notification />
      </ScrollView>
    </Container>
  );
};

export default Settings;
