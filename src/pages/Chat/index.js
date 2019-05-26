import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  View, Text, StyleSheet, Dimensions,
} from 'react-native';
import { Avatar, ListItem, Badge } from 'react-native-elements';

import { H1 } from '~/components';
import {
  Container, Header, Profile, Content,
} from './styles';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  linearGradient: {
    padding: 10,
    marginTop: 10,
    borderRadius: 15,
    borderBottomRightRadius: 0,
    maxWidth: width - 60,
    alignSelf: 'flex-end',
  },
  buttonText: {
    fontSize: 12,
    textAlign: 'left',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  linearGradient2: {
    padding: 10,
    marginTop: 10,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    maxWidth: width - 60,
    alignSelf: 'flex-start',
  },
});
const Chat = () => (
  <Container>
    <Header>
      <H1>Chris Jackson</H1>
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
    <Content>
      <LinearGradient
        colors={['#0AC4BA', '#2BDA8E']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.2, y: 0 }}
        style={styles.linearGradient}
      >
        <Text style={styles.buttonText}>Sign in with Facebook</Text>
      </LinearGradient>
      <LinearGradient
        colors={['#323643', '#323643']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.2, y: 0 }}
        style={styles.linearGradient2}
      >
        <Text style={styles.buttonText}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate tenetur perspiciatis
          qui assumenda, distinctio sunt iure veritatis, in, reiciendis dolore sequi. Officia sit
          sapiente illo quo architecto nobis delectus quis!
        </Text>
      </LinearGradient>
    </Content>
  </Container>
);

export default Chat;
