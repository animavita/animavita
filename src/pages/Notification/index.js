import React from 'react';

import { View } from 'react-native';
import { Avatar } from 'react-native-elements';

import { H1 } from '~/components';
import { Container, Header, Profile } from './styles';

const Notification = () => (
  <Container>
    <Header>
      <H1>Notificações</H1>
      <Profile>
        <Avatar
          rounded
          size={16 * 2.2}
          source={{
            uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}
        />
      </Profile>
    </Header>
  </Container>
);

export default Notification;
