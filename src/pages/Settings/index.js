import React, { Component } from 'react';

import { ScrollView } from 'react-native';

import { Avatar, Divider } from 'react-native-elements';
import { Container, Header, styles } from './styles';

import { H1 } from '~/components';
import Distance from './components/Distance';
import Personal from './components/Personal';
import Notification from './components/Notification';
import Profile from '~/components/Profile';

class Settings extends Component {
  state = {};

  render() {
    return (
      <Container>
        <Profile title="Perfil" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Personal name="Wendel" lastname="Freitas" email="wendelfb@bol.com.br" />
          <Divider style={styles.divider} />
          <Distance />
          <Divider style={styles.divider} />
          <Notification />
        </ScrollView>
      </Container>
    );
  }
}

export default Settings;
