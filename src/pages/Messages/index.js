import React from 'react';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient';
import { View, Text } from 'react-native';
import { Avatar, ListItem, Badge } from 'react-native-elements';

import { H1 } from '~/components';
import { Container, Header, Content } from './styles';

import Profile from '~/components/Profile';

const Messages = ({ navigation }) => (
  <Container>
    <Profile title="Mensagens" />
    <Content>
      <ListItem
        Component={TouchableScale}
        containerStyle={{ borderRadius: 15 }}
        friction={90}
        tension={100}
        activeScale={0.95}
        linearGradientProps={{
          colors: ['#0AC4BA', '#2BDA8E'],
          start: { x: 1, y: 0 },
          end: { x: 0.2, y: 0 },
        }}
        ViewComponent={LinearGradient}
        leftAvatar={{
          rounded: true,
          source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' },
        }}
        title="Chris Jackson"
        titleStyle={{ color: 'white', fontWeight: '500', fontSize: 14 }}
        onPress={() => navigation.navigate('Chat')}
        subtitleStyle={{ color: 'white', fontSize: 12 }}
        subtitle="Onde posso busca-lo?"
        chevronColor="white"
        chevron
      />
    </Content>
  </Container>
);

export default Messages;
